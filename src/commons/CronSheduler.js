const cron = require('node-cron');
import McqResponseModel from '../Models/McqResponseModel';
import UserModel from '../Models/UserModel';
import mcqResponseRepo from '../Controllers/candidate/McqResponseRepo';
import testResultGenerator from '../Controllers/candidate/TestResultGenerator';

//cron.schedule('0 */30 * * *', () => { EvaluateNewSubmissions() });

const EvaluateNewSubmissions = async () => {
    console.log('Started scheduled activity of evaluating new submissions', new Date());
    let mcqResponseModel = new McqResponseModel();
    let adminUser = await getAdminUser();
    if(!adminUser) { console.log('Admin user details not found, cannot run evaluation.'); return; };
    let responses = await mcqResponseModel.GetMcqResponsesPendingForEvaluation();
    responses.forEach(async (responseItem) => {
        console.log(`started processing responseId: ${responseItem.id}, invitationId: ${responseItem.response_meta.invitationId}`);
        await mcqResponseRepo.evaluateResults(responseItem.response_meta.invitationId);
        await testResultGenerator.generateAndSendResultsForInvitationId(adminUser, responseItem.response_meta.invitationId, true);
    })
    console.log('Completed scheduled activity of evaluating new submissions', new Date());
}

const getAdminUser = async () => {
    let adminEmail = 'encasherr@gmail.com';
    let userModel = new UserModel();
    let users = await userModel.GetUserByEmail(adminEmail)
    let existingUser = users[0];
    if(existingUser) {
        let userMeta = JSON.parse(existingUser.user_meta);
        let userEntity = {
            id: existingUser.id,
            emailId: adminEmail,
            name: userMeta.name ? userMeta.name : adminEmail,
            role: userMeta.role,
            orgId: userMeta.orgId
        };
        return userEntity;
    }
    else {
        console.log(`User ${adminEmail} not found`);
    }
    return null;
}