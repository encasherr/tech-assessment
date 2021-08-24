import EmailHelper  from "../../../wwwroot/commons/EmailHelper";
import { getCurrentDateTime } from "../../commons/HelperFunctions";
import { Constants } from "../../commons/ServerConfig";
import InvitationModel from "../../Models/InvitationModel";
import McqResponseModel from "../../Models/McqResponseModel";
import OrgModel from "../../Models/OrgModel";
import TestModel from "../../Models/TestModel";
import UserModel from "../../Models/UserModel";
import invitationRepo from "./InvitationRepo";

const generateAndSendResultsForInvitationId = async (user, invitationId, isTestMode) => {
    let invitationModel = new InvitationModel();
    let testModel = new TestModel();
    let responseModel = new McqResponseModel();
    let userModel = new UserModel();
    let orgModel = new OrgModel();

    let invitationEntity = await invitationModel.GetInvitation(invitationId);
    let candidateEntity = await invitationModel.GetCandidateInfoByInvitationId(invitationId);
    let testEntity = await testModel.GetTestById(user, invitationEntity.invitation_meta.testId);
    let responseEntity = await responseModel.GetByInvitationId(invitationId);
    let testCreatorEntity = await userModel.GetUser(testEntity.test_meta.createdBy);
    let orgEntity = await orgModel.GetOrg(testCreatorEntity.user_meta.orgId);  

    if(!invitationEntity || !candidateEntity || !testEntity || !responseEntity) {
        console.log('Not enough details available to generate test results');
        return;
    }

    let emailRecipients = ''; //'alok_j10@yahoo.co.in'; // testCreatorEntity.emailId;
    if(orgEntity && orgEntity.org_meta.emailId) {
        emailRecipients += `${orgEntity.org_meta.emailId}`;
    }
    if(testEntity && testEntity.test_meta.settings && testEntity.test_meta.settings.resultNotificationEmailId) {
        emailRecipients += `, ${testEntity.test_meta.settings.resultNotificationEmailId}`;
    }
    emailRecipients = emailRecipients || Constants.AdminEmailId;
    
    let category = responseEntity.response_meta.mcqs ? responseEntity.response_meta.mcqs[0].mcq.mcq_meta.category : '';
    let totalQuestions = responseEntity.response_meta.mcqs ? responseEntity.response_meta.mcqs.length : 0;
    let mcqResponses = responseEntity.response_meta.mcqs;

    console.log('Prepared data for sending test result email');

    let emailInfo = {
        to: emailRecipients,
        bcc: Constants.AdminEmailId,
        subject: `Test results for ${candidateEntity.candidateName}`,
        notificationType: 'test_result_email',
        isTestMode: isTestMode,
        invokeReplaceFunction: (html) => {
            console.log('Applying data on email template');
            html = html.replace(/__candidateName__/g, candidateEntity.candidateName);
            html = html.replace('$$candidateEmail$$', candidateEntity.candidateEmail);
            html = html.replace('$$candidateTotalExperience$$', candidateEntity.candidateExperience);
            html = html.replace(/__testName__/g, testEntity.test_meta.testName);
            html = html.replace('$$testCategory$$', category);
            html = html.replace('$$testSkill$$', testEntity.test_meta.skill);
            html = html.replace('$$invitedOn$$', invitationEntity.invitation_meta.invitedOn);
            html = html.replace('$$completedOn$$', invitationEntity.invitation_meta.completedOn);
            html = html.replace('$$totalQuestions$$', totalQuestions);
            html = html.replace('$$candidateScore$$', responseEntity.response_meta.scorePercentage);
            html = html.replace('$$testResult$$', responseEntity.response_meta.result);
            
            let responseDetailsHtml = '<br>';
            mcqResponses.forEach((responseItem, index) => {
                let { mcq } = responseItem;
                let correctChoices = [];
                let candidateResponses = [];
                mcq.mcq_meta.choices.map((choice) => {
                    if(choice.isCorrect) {
                        correctChoices.push(choice.content)
                    }
                    if(responseItem.candidateResponse && responseItem.candidateResponse.responseKeys && responseItem.candidateResponse.responseKeys.length) {
                        if(responseItem.candidateResponse.responseKeys.includes(choice.key)) {
                            candidateResponses.push(choice.content);
                        }
                    }
                });
                responseDetailsHtml += '<p>';

                responseDetailsHtml += `<h4>${mcq.questionOrderIndex+1}: ${mcq.mcq_meta.description}</h4><br>`;
                responseDetailsHtml += `Correct Answer:<br>`;
                correctChoices.forEach((item) => {
                    responseDetailsHtml += item + '<br>';
                })
                responseDetailsHtml += `<p ${responseItem.isCorrect ? 'style="color:#61A910;">' : 'style="color:#BB5642;">'}Candidate Response</p>` 
                candidateResponses.forEach((item) => {
                    responseDetailsHtml += item + '<br>';
                })

                responseDetailsHtml += '</p>';
                responseDetailsHtml += '<hr>';
            })
            html = html.replace('$$detailedResponses$$', responseDetailsHtml);

            return html;
        }
    }
    let emailHelper = new EmailHelper();
    emailHelper.SendEmail(emailInfo)
            .then(() => {
                invitationRepo.updateInvitationStatus(invitationId, { resultEmailStatus: `Email Sent on ${getCurrentDateTime()}` });
            })
            .catch((error) => {
                console.log('Email sending failed');
                console.log(error);
                invitationRepo.updateInvitationStatus(invitationId, { resultEmailStatus: `Email sending failed` });
            });
}

module.exports = {
    generateAndSendResultsForInvitationId
}