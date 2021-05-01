import InvitationModel from '../../Models/InvitationModel';
import CandidateModel from '../../Models/CandidateModel';
import TestModel from '../../Models/TestModel';
import DbConfig from '../../commons/DbConfig';
import EmailHelper from '../../commons/EmailHelper';
import { EmailConfig, Constants } from '../../commons/ServerConfig';

const sendInvite = async (userId, invitees, testId) => {
    let promises = [];
    if (invitees && invitees.length > 0) {
        let testModel = new TestModel();
        let dbConfig = new DbConfig();

        let KeyValues = await dbConfig.Initialize();
        let siteUrl = KeyValues ?
                (KeyValues.site_url ? KeyValues.site_url : '') : '';
        let faqLink = dbConfig.KeyValues.faq_link;

        invitees.map((invitee, index) => {
            let promise = new Promise(async (resolve, reject) => {
                let candidateId = await AddCandidateIfNotExist(invitee, reject);
                if(candidateId <= 0) {
                    reject(`Candidate '${invitee.name}', ${invitee.emailId} could not be created`);
                }
                else {
                    let testEntity = await testModel.GetTest(testId);    
                    let invitationId = await AddInvitation(userId, candidateId, testId);
                    
                    sendEmail(invitationId, invitee, testEntity, siteUrl, faqLink)
                    resolve();
                }          
            })
            promises.push(promise);
        });
    }
    return Promise.all(promises);
}

const getEmailSubject = (testEntity) => {
    let emailSubject = `Online Test Invitation - ${testEntity.test_meta.testName}`;
    if(testEntity && 
        testEntity.test_meta && 
        testEntity.test_meta.test_settings &&
        testEntity.test_meta.test_settings.emailSubject) {
            emailSubject = testEntity.test_meta.test_settings.emailSubject;
        }
    return emailSubject;
}

const AddCandidateIfNotExist = async (invitee, reject) => {
    let candidateModel = new CandidateModel();
    let candidateId = 0;
    let candidateEntity = await candidateModel.GetCandidateByEmail(invitee.emailId);
    console.log('candidateentity', candidateEntity);
    if(!candidateEntity || (candidateEntity && candidateEntity.length === 0)) {
        console.log(`candidate not found, adding to DB for emailId: ${invitee.emailId}`);
        let candidateMeta = {
            name: invitee.name,
            email: invitee.emailId
        }
        candidateId = await candidateModel.Add(candidateMeta);
    }
    else {
        candidateId = candidateEntity[0].id;
    }
    console.log(`CandidateId created/found: ${candidateId}`);
    return candidateId;
}

const AddInvitation = async (userId, candidateId, testId) => {
    let invitationModel = new InvitationModel();
    let invitationEntity = {
        candidateId: candidateId,
        testId: testId,
        createdBy: userId
    }
    let invitationId = await invitationModel.Add(invitationEntity);
    console.log(`InvittationId created: ${invitationId}`);
    return invitationId;
}

const sendEmail = (invitationId, invitee, testEntity, siteUrl, faqLink) => {
    let emailInfo = {
        to: invitee.emailId,
        subject: getEmailSubject(testEntity),
        testName: testEntity.test_meta.testName,
        testDuration: testEntity.test_meta.duration,
        testLink: EmailConfig.getTestLink(siteUrl, invitationId),
        faqLink: EmailConfig.getFaqLink(siteUrl, faqLink),
        notificationType: 'test'
    };
    let emailHelper = new EmailHelper();
    console.log(`Sending email to : ${invitee.emailId}`);
    emailHelper.SendEmail(emailInfo);
}

export default {
    sendInvite
}