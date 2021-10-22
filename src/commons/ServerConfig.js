import path from 'path';
import queries from '../db/queries';
import db from "../db/mysqldb";
import { encrypt } from '../utils/general';

const EmailConfig = {
    emailSmtpHost: 'smtp.gmail.com',
    emailSmtpPort: 587,
    emailAuthUser: 'encasherr@gmail.com',
    emailAuthPassword: 'CFT@12345',
    inviteFromEmailId: 'encasherr@gmail.com',
    getTestLink: (domainUrl, invitationId) => {
        if(!domainUrl) {
            domainUrl = 'http://localhost:3001/'
        }
        return `${domainUrl}/testLanding/${invitationId}`;
    },
    getFaqLink: (domainUrl, faqLink) => {
        if(!domainUrl) {
            domainUrl = 'http://localhost:3001/'
        }
        return `${domainUrl}${faqLink}`;
    },
    getVerificationLink: (domainUrl, encryptedObject) => {
        if(!domainUrl) {
            domainUrl = 'http://localhost:3001'
        }
        let verificationLink = `${domainUrl}/api/candidate/verifyUser?userIv=${encryptedObject.iv}&userContent=${encryptedObject.content}`;
        verificationLink = `${domainUrl}/verifyUser/${encryptedObject.iv}/${encryptedObject.content}`;
        return verificationLink;
    }
}
const AuthConfig = {
    clientId: '350931387343-l9s3gs4fnmbj4rk4r4nfvh5siega0s5g.apps.googleusercontent.com',
    clientSecret: 'nMaeSsEr8e9-j26dstZ6VAJc',
    myPrivateKey: 'myPrivateKey'
}
const Constants = {
    AdminEmailId: 'encasherr@gmail.com',
    AdminRole: 'admin',
    PassingPercentage: 70,
    DefaultScore: 10,
    CandidateThanksMessage: `Thanks for taking online test!
    Your answers are submitted successfully.
    We will share the evaluation results with your recruiter.`,
    InvitationTestStatus : {
        Started: 'STARTED',
        Completed: 'COMPLETED',
        Passed: 'PASSED',
        Failed: 'FAILED',
        NotStarted: 'NOT STARTED'
    },
    ResponseValues: {
        NotResponded: 0,
    }
}
const DbConfig = {
    filePath: path.join(__dirname,'..', 'data', 'dev.json')
}

export {
    EmailConfig,
    AuthConfig,
    Constants,
    DbConfig
};