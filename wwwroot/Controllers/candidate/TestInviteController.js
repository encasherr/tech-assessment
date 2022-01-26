'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _AdminTestController = require('../admin/AdminTestController');

var _AdminTestController2 = _interopRequireDefault(_AdminTestController);

var _InvitationModel = require('../../Models/InvitationModel');

var _InvitationModel2 = _interopRequireDefault(_InvitationModel);

var _ServerConfig = require('../../commons/ServerConfig');

var _EmailHelper = require('../../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _CandidateModel = require('../../Models/CandidateModel');

var _CandidateModel2 = _interopRequireDefault(_CandidateModel);

var _TestModel = require('../../Models/TestModel');

var _TestModel2 = _interopRequireDefault(_TestModel);

var _McqModel = require('../../Models/McqModel');

var _McqModel2 = _interopRequireDefault(_McqModel);

var _McqResponseModel = require('../../Models/McqResponseModel');

var _McqResponseModel2 = _interopRequireDefault(_McqResponseModel);

var _Evaluator = require('../../commons/Evaluator');

var _Evaluator2 = _interopRequireDefault(_Evaluator);

var _users = require('../../users');

var _users2 = _interopRequireDefault(_users);

var _DbConfig = require('../../commons/DbConfig');

var _DbConfig2 = _interopRequireDefault(_DbConfig);

var _CandidateRepo = require('./CandidateRepo');

var _CandidateRepo2 = _interopRequireDefault(_CandidateRepo);

var _InvitationRepo = require('./InvitationRepo');

var _InvitationRepo2 = _interopRequireDefault(_InvitationRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from '../../db';

// import Constants from '../../commons/Constants';


var TestInviteController = function TestInviteController() {
    var _this = this;

    _classCallCheck(this, TestInviteController);

    this.GetAll = function (req, resp) {
        console.log('get all invitations called', req.user);
        var model = new _InvitationModel2.default();
        model.GetAllInvitations(req.user).then(function (res) {
            resp.status(200).json(res);
        }).catch(function (err) {
            console.log('error occurred in get invitations', err);
            var obj = { status: 500, message: err };
            resp.status(500).send(obj);
        });
    };

    this.GetInvitation = function (req, resp) {
        console.log('get invitation called', req.body);
        console.log(req.body.invitationId);
        var model = new _InvitationModel2.default();
        model.GetInvitation(req.body.invitationId).then(function (res) {
            resp.status(200).json(res);
        }).catch(function (err) {
            var obj = { status: 500, message: err };
            resp.status(500).send(obj);
        });
    };

    this.AuthenticateCandidate = function (req, resp, done) {
        console.log('authenticate candidate called');
        console.log(req.body);
        var invitationId = req.body.invitationId;

        var invitationModel = new _InvitationModel2.default();
        invitationModel.GetCandidateInfoByInvitationId(invitationId).then(function (candidateInfo) {
            if (candidateInfo) {
                var userEntity = {
                    id: candidateInfo.candidateId,
                    emailId: candidateInfo.candidateEmail,
                    name: candidateInfo.candidateName ? candidateInfo.candidateName : candidateInfo.candidateEmail,
                    role: _users2.default.UserRoles.candidate
                };
                console.log('candidate found', userEntity);
                req.user = userEntity;
                done(null, userEntity);
            } else {
                console.log('unknown candidate login being attempted');

                var newUser = {
                    emailId: emailId,
                    status: 'not found',
                    name: emailId,
                    role: 'guest'
                };

                done(null, newUser);
            }
        });
    };

    this.UpdateInvite = function (req, resp) {
        console.log('update invite called');
        console.log(req.body);
        var inviteId = req.body.id;
        var newEntity = req.body.invitation_meta;
        var model = new _InvitationModel2.default();
        model.Update(req.body).then(function (entity) {
            resp.status(200).send(entity);
        }).catch(function (err) {
            resp.status(500).send(err);
        });
    };

    this.StartTest = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, resp) {
            var invitationId, invitationModel, invitationEntity, testModel, mcqModel, mcqResponseModel, invitationStatus, testEntity, mcqResponseEntity, mcqResponseMeta, mcqResponse;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            console.log('start test called');
                            invitationId = req.body.invitationId;

                            console.log('req.body', req.body);

                            invitationModel = new _InvitationModel2.default();
                            _context.next = 6;
                            return invitationModel.GetInvitation(invitationId);

                        case 6:
                            invitationEntity = _context.sent;

                            if (invitationEntity) {
                                _context.next = 11;
                                break;
                            }

                            resp.status(404).json({
                                message: "Not found"
                            });
                            _context.next = 36;
                            break;

                        case 11:
                            testModel = new _TestModel2.default();
                            mcqModel = new _McqModel2.default();
                            mcqResponseModel = new _McqResponseModel2.default();
                            invitationStatus = invitationEntity.invitation_meta.status;

                            if (!(invitationStatus && invitationStatus === 'COMPLETED')) {
                                _context.next = 18;
                                break;
                            }

                            resp.status(200).json({
                                message: 'Response for this test is already submitted and the same has been shared with recruiter.'
                            });
                            return _context.abrupt('return');

                        case 18:
                            _context.next = 20;
                            return testModel.GetTest(invitationEntity.invitation_meta.testId);

                        case 20:
                            testEntity = _context.sent;
                            _context.next = 23;
                            return mcqResponseModel.GetByInvitationId(invitationId);

                        case 23:
                            mcqResponseEntity = _context.sent;

                            if (!mcqResponseEntity) {
                                _context.next = 29;
                                break;
                            }

                            console.log('existing mcq response returned');
                            resp.status(200).json(mcqResponseEntity);
                            _context.next = 36;
                            break;

                        case 29:
                            _context.next = 31;
                            return _CandidateRepo2.default.createNewMcqResponseMeta(testEntity, invitationEntity);

                        case 31:
                            mcqResponseMeta = _context.sent;
                            _context.next = 34;
                            return _CandidateRepo2.default.startNewTest(invitationEntity, mcqResponseMeta);

                        case 34:
                            mcqResponse = _context.sent;

                            if (mcqResponse) {
                                resp.status(200).json(mcqResponse);
                            } else {
                                resp.status(500).json({ message: 'Error in loading Test' });
                            }

                        case 36:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();

    this.RegisterForTest = function (req, resp) {
        console.log('RegisterForTest called');
        var testId = req.body.testId;

        var invitees = [{
            emailId: req.user.emailId,
            name: req.user.name
        }];

        _InvitationRepo2.default.sendInvite(req.user.id, invitees, testId).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var testModel, testEntity;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            testModel = new _TestModel2.default();
                            _context2.next = 3;
                            return testModel.GetTest(testId);

                        case 3:
                            testEntity = _context2.sent;

                            resp.status(200).json(testEntity);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }))).catch(function (err) {
            var response = { message: 'Error occured in register for test:' + err };
            console.log(response);
            resp.status(500).json(response);
            return;
        });
    };

    this.SendInvite = function (req, resp) {
        console.log('send invite called');
        console.log(req.body);
        // let entity = req.body.invitation_meta;
        var _req$body = req.body,
            testId = _req$body.testId,
            invitees = _req$body.invitees;

        if (!invitees || invitees && invitees.length === 0) {
            var response = { message: 'No invitees to send email to.' };
            console.log(response);
            resp.status(500).json(response);
            return;
        }

        _InvitationRepo2.default.sendInvite(req.user.id, invitees, testId).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var testModel, testEntity;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            testModel = new _TestModel2.default();
                            _context3.next = 3;
                            return testModel.GetTest(testId);

                        case 3:
                            testEntity = _context3.sent;

                            resp.status(200).json(testEntity);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }))).catch(function (err) {
            var response = { message: 'Error occured in sending invite:' + err };
            console.log(response);
            resp.status(500).json(response);
            return;
        });
        // let invitationModel = new InvitationModel();
        // let candidateModel = new CandidateModel();
        // let testModel = new TestModel();
        // let dbConfig = new DbConfig();

        // let siteUrl = '';
        // dbConfig.Initialize().then((KeyValues) => {
        //     siteUrl = KeyValues ?
        //         (KeyValues.site_url ? KeyValues.site_url : '') : '';
        // })

        // let emailIds = entity.emailTo.split(";");
        /*if (emailIds && emailIds.length > 0) {
            emailIds.map((emailId, index) => {
                let candidateMeta = {
                    name: entity.name,
                    email: emailId
                }
                candidateModel.Add(candidateMeta).then((candidateId) => {
                    testModel.GetTest(entity.testId).then((testEntity) => {
                        let invitationEntity = {
                            candidateId: candidateId,
                            testId: testEntity.id,
                            createdBy: req.user.id
                        }
                        invitationModel.Add(invitationEntity).then((invitationId) => {
                            let emailInfo = {
                                to: emailId,
                                subject: entity.emailSubject,
                                testName: testEntity.test_meta.testName,
                                testDuration: testEntity.test_meta.duration,
                                testLink: EmailConfig.getTestLink(dbConfig.KeyValues.site_url, invitationId),
                                faqLink: EmailConfig.getFaqLink(dbConfig.KeyValues.site_url, dbConfig.KeyValues.faq_link),
                                notificationType: 'test'
                            };
                            let emailHelper = new EmailHelper();
                            emailHelper.SendEmail(emailInfo);
                            resp.status(200).json(testEntity);
                        })
                    });
                }).catch((err) => {
                    resp.status(500).json({ message: 'error occured in sending invite:' + err });
                });
            });
        }*/
    };

    this.CaptureResponse = function (req, resp) {
        console.log('Capture response called');
        console.log(req.body);
        var entity = req.body;
        var mcqResponseModel = new _McqResponseModel2.default();
        mcqResponseModel.Update(entity).then(function (updatedRecord) {
            console.log('Response captured');
            resp.status(200).json(updatedRecord);
        }).catch(function (err) {
            console.log('Exception occurred in Capturing response', err);
            resp.status(500).json({ message: 'Error in capturing response: ' + err });
        });
    };

    this.getCurrentDateTime = function () {
        var finalStr = '';
        var dt = new Date();
        finalStr = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
        // finalStr += ` ${dt.getHours()}:${dt.getMinutes()}`;
        var h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
            m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
        finalStr += ' ' + h + ':' + m;
        return finalStr;
    };

    this.SubmitAnswers = function (req, resp) {
        console.log('Submit answers called');
        console.log(req.body);
        var entity = req.body;
        var mcqResponseModel = new _McqResponseModel2.default();
        var invitationModel = new _InvitationModel2.default();

        mcqResponseModel.Update(entity).then(function (updatedRecord) {
            console.log('All Responses submitted');
            invitationModel.GetInvitation(entity.response_meta.invitationId).then(function (invitationEntity) {

                invitationEntity.invitation_meta.completedOn = _this.getCurrentDateTime();
                invitationEntity.invitation_meta.status = _ServerConfig.Constants.InvitationTestStatus.Completed;
                invitationModel.Update(invitationEntity).then(function (res) {
                    resp.status(200).json({ message: _ServerConfig.Constants.CandidateThanksMessage });
                });
            });
        }).catch(function (err) {
            console.log('Exception occurred in submitting answers', err);
            resp.status(500).json({ message: 'Error in submitting answers: ' + err });
        });
    };

    this.EvaluateAnswers = function (req, resp) {
        console.log('Evaluate answers called by', req.user);
        console.log(req.body);
        var responseId = req.body.responseId;
        var mcqResponseModel = new _McqResponseModel2.default();
        mcqResponseModel.GetMcqResponse(responseId).then(function (mcqResponse) {
            var evaluator = new _Evaluator2.default();
            evaluator.Evaluate(mcqResponse).then(function (evaluatedMcqResponse) {
                mcqResponseModel.Update(evaluatedMcqResponse).then(function (updatedEntity) {
                    console.log('Evaluation done');
                    // this.GetAll(req, resp);

                    var model = new _InvitationModel2.default();
                    model.GetAllInvitations(req.user).then(function (res) {
                        resp.status(200).json(res);
                    }).catch(function (err) {
                        console.log('error occurred in get invitations', err);
                        var obj = { status: 500, message: err };
                        resp.status(500).send(obj);
                    });
                }).catch(function (err) {
                    console.log('Error in evaluation: ', err);
                    res.status(500).json({ message: 'Error in evaluation: ' + err });
                });
            });
        });
    };
};

exports.default = new TestInviteController();
//# sourceMappingURL=TestInviteController.js.map