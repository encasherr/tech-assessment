'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _AdminTestController = require('../admin/AdminTestController');

var _AdminTestController2 = _interopRequireDefault(_AdminTestController);

var _Constants = require('../../commons/Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _TestModel = require('../../TestModel');

var _TestModel2 = _interopRequireDefault(_TestModel);

var _ServerConfig = require('../../commons/ServerConfig');

var _EmailHelper = require('../../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestInviteController = function TestInviteController() {
    var _this = this;

    _classCallCheck(this, TestInviteController);

    this.StartTest = function (req, resp) {
        // let { testId, candidateEmailId } = req.body;
        var candidateEmailId = req.user.emailId;
        var model = new _TestModel2.default();
        var testId = 0;
        console.log('req.body', req.body);
        if (req.body.testId) {
            testId = req.body.testId;
        } else {
            testId = model.GetTestId(candidateEmailId);
        }
        model.GetTestForSimulator(testId).then(function (res) {
            model.UpdateTestInvite(res, candidateEmailId, _Constants2.default.CandidateTestStatus.Started);
            resp.status(200).json({
                message: 'success',
                data: res
            });
        }).catch(function (err) {
            console.log('Error while loading testId: ' + testId + ' , error: ' + err);
            resp.status(404).json({
                message: err
            });
        });
    };

    this.SendInvite = function (req, resp) {
        console.log('send invite called');
        console.log(req.body);
        var _req$body = req.body,
            invitations = _req$body.invitations,
            testId = _req$body.testId,
            testName = _req$body.testName;

        var test_link = _this.generate_test_link(testId);
        _AdminTestController2.default.UpdateTest(testId, req.body, test_link);
        if (invitations && invitations.length > 0) {
            var sentEmailIds = [];
            var model = new _TestModel2.default();
            invitations.map(function (inviteInfo, index) {
                if (!sentEmailIds.includes(inviteInfo.emailTo)) {
                    var emailInfo = {
                        to: inviteInfo.emailTo,
                        subject: inviteInfo.emailSubject,
                        testName: testName,
                        testLink: test_link,
                        notificationType: 'test'
                    };
                    var emailHelper = new _EmailHelper2.default();
                    emailHelper.SendEmail(emailInfo);
                    sentEmailIds.push(inviteInfo.emailTo);

                    model.UpdateTestInvite(testId, emailInfo.to, _Constants2.default.CandidateTestStatus.NotStarted);
                }
            });
        }
        resp.send('Email Sent');
    };

    this.generate_test_link = function (testId) {
        var link = _ServerConfig.EmailConfig.testLinkPrefix + testId;
        return link;
    };

    this.initializeCollection = function () {
        var tests = _db2.default.getCollection('tests');
        if (!tests) {
            tests = _db2.default.addCollection('tests');
        }
        return tests;
    };
}

// UpdateTestInvite = (testEntity, candidateEmailId, testStatus) => {
//     // let tests = this.initializeCollection();
//     // let testEntity = this.GetTestToInvite(tests, testId);
//     if(testEntity !== null) {
//         let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
//         if(candidateInvite !== null) {
//             candidateInvite.testStatus = testStatus;
//             tests.update(testEntity);
//             db.saveDatabase();
//             return testEntity;
//         }
//     }
//     return null;
// }

// GetCandidateInvite = (testEntity, candidateEmailId) => {
//     // let tests = this.initializeCollection();
//     if(testEntity && testEntity.invitations) {
//         let filteredCandidates = testEntity.invitations.where((item) => {
//             return item.emailTo == candidateEmailId;    
//         });
//         if(filteredCandidates && filteredCandidates.length > 0) {
//             return filteredCandidates[0];
//         }
//     }
//     return null;
// }

// GetTestToInvite = (tests, testId) => {
//     let filteredTests = tests.where((item) => {
//         return item['$loki'] == testId;    
//     });
//     if(filteredTests && filteredTests.length > 0) {
//         return filteredTests[0];
//     }
//     return null;
// }

;

exports.default = new TestInviteController();
//# sourceMappingURL=TestInviteController.js.map