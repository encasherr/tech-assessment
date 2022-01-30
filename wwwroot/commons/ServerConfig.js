'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DbConfig = exports.Constants = exports.AuthConfig = exports.EmailConfig = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _general = require('../utils/general');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmailConfig = {
    emailSmtpHost: 'smtp.gmail.com',
    emailSmtpPort: 587,
    emailAuthUser: 'encasherr@gmail.com',
    emailAuthPassword: 'azdwezfcclolbuku',
    inviteFromEmailId: 'encasherr@gmail.com',
    getTestLink: function getTestLink(domainUrl, invitationId) {
        if (!domainUrl) {
            domainUrl = 'http://localhost:3001/';
        }
        return domainUrl + '/testLanding/' + invitationId;
    },
    getFaqLink: function getFaqLink(domainUrl, faqLink) {
        if (!domainUrl) {
            domainUrl = 'http://localhost:3001/';
        }
        return '' + domainUrl + faqLink;
    },
    getVerificationLink: function getVerificationLink(domainUrl, encryptedObject) {
        if (!domainUrl) {
            domainUrl = 'http://localhost:3001';
        }
        var verificationLink = domainUrl + '/api/candidate/verifyUser?userIv=' + encryptedObject.iv + '&userContent=' + encryptedObject.content;
        verificationLink = domainUrl + '/verifyUser/' + encryptedObject.iv + '/' + encryptedObject.content;
        return verificationLink;
    }
};
var AuthConfig = {
    clientId: '350931387343-l9s3gs4fnmbj4rk4r4nfvh5siega0s5g.apps.googleusercontent.com',
    clientSecret: 'nMaeSsEr8e9-j26dstZ6VAJc',
    myPrivateKey: 'myPrivateKey'
};
var Constants = {
    AdminEmailId: 'encasherr@gmail.com',
    AdminRole: 'admin',
    PassingPercentage: 70,
    DefaultScore: 10,
    CandidateThanksMessage: 'Thanks for taking online test!\n    Your answers are submitted successfully.\n    We will share the evaluation results with your recruiter.',
    InvitationTestStatus: {
        Started: 'STARTED',
        Completed: 'COMPLETED',
        Passed: 'PASSED',
        Failed: 'FAILED',
        NotStarted: 'NOT STARTED'
    },
    ResponseValues: {
        NotResponded: 0
    }
};
var DbConfig = {
    filePath: _path2.default.join(__dirname, '..', 'data', 'dev.json')
};

exports.EmailConfig = EmailConfig;
exports.AuthConfig = AuthConfig;
exports.Constants = Constants;
exports.DbConfig = DbConfig;
//# sourceMappingURL=ServerConfig.js.map