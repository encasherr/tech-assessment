import CandidateModel from '../../Models/CandidateModel';

const registerForTest = async(user, testId) => {
    return new Promise(async(resolve, reject) => {
        try
        {
            let candidateEntity = await candidateModel.GetCandidateByEmail(user.emailId);
            let invitationId = await AddInvitation(user.id, candidateEntity[0].id, testId);
            resolve();
        }
        catch(e)
        {
            reject(e);
        }
    })
}


export default {
    registerForTest
}