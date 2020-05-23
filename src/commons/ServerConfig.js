import path from 'path';

const EmailConfig = {
    emailSmtpHost: 'smtp.gmail.com',
    emailSmtpPort: 587,
    emailAuthUser: 'encasherr@gmail.com',
    emailAuthPassword: 'actionChange',
    inviteFromEmailId: 'encasherr@gmail.com',
    getTestLink: (domainUrl, invitationId) => {
        if(!domainUrl) {
            domainUrl = 'http://localhost:3001/'
        }
        return `${domainUrl}testLandingPage/${invitationId}`;
    },
    getFaqLink: (domainUrl, faqLink) => {
        if(!domainUrl) {
            domainUrl = 'http://localhost:3001/'
        }
        return `${domainUrl}${faqLink}`;
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