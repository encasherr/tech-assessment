"use strict";

require("babel-core/register");

require("babel-polyfill");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _process = require("process");

var _McqModel = require("../../../wwwroot/Models/McqModel");

var _McqModel2 = _interopRequireDefault(_McqModel);

var _UserModel = require("../../../wwwroot/Models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _InvitationRepo = require("../../../wwwroot/Controllers/candidate/InvitationRepo");

var _InvitationRepo2 = _interopRequireDefault(_InvitationRepo);

var _TestResultGenerator = require("../../../wwwroot/Controllers/candidate/TestResultGenerator");

var _TestResultGenerator2 = _interopRequireDefault(_TestResultGenerator);

var _McqResponseRepo = require("../../../wwwroot/Controllers/candidate/McqResponseRepo");

var _McqResponseRepo2 = _interopRequireDefault(_McqResponseRepo);

var _TestModel = require("../../../wwwroot/Models/TestModel");

var _TestModel2 = _interopRequireDefault(_TestModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import invitationRepo from "../../../src/Controllers/candidate/InvitationRepo";
var _require = require('console'),
    exception = _require.exception;

var readl = require('readline');
// const McqModel = require('../../../wwwroot/Models/McqModel');
// import McqModel from '../../src/Models/McqModel.js';
// const { default: McqModel } = require('../../src/Models/McqModel');
// const UserModel = require('../../../wwwroot/Models/UserModel');
var config = require('./config/mcqConfig');


console.log('Welcome to Admin area');
var readline = readl.createInterface({
    input: process.stdin, output: process.stdout
});

var adminUser = {};
var setAdminUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var adminEmail, userModel, users, existingUser, userMeta, userEntity;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        adminEmail = 'encasherr@gmail.com';
                        userModel = new _UserModel2.default();
                        _context.next = 4;
                        return userModel.GetUserByEmail(adminEmail);

                    case 4:
                        users = _context.sent;

                        // .then((users) => {
                        existingUser = users[0];

                        if (existingUser) {
                            userMeta = JSON.parse(existingUser.user_meta);
                            userEntity = {
                                id: existingUser.id,
                                emailId: adminEmail,
                                name: userMeta.name ? userMeta.name : adminEmail,
                                role: userMeta.role,
                                orgId: userMeta.orgId
                            };
                            // console.log('user found', userEntity);

                            adminUser = userEntity;
                        } else {
                            console.log("User " + adminEmail + " not found");
                        }
                        // })
                        // .catch((error) => {
                        //     console.log('Exception occurred in getting current user details', error);
                        // });

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function setAdminUser() {
        return _ref.apply(this, arguments);
    };
}();

var buildMenu = function buildMenu(menuOptions) {
    var finalStr = '';
    finalStr += "\nWelcome " + adminUser.name + "! What would you like to do now?";
    finalStr += '\n';
    menuOptions.forEach(function (option) {
        finalStr += option.optionIndex + ":  " + option.optionText + "\n";
    });
    finalStr += '\n';
    return finalStr;
};

var menuOptions = [{ optionIndex: "1", optionText: "Create a Programming MCQ" }, { optionIndex: "2", optionText: "Create an Academic MCQ" }, { optionIndex: "3", optionText: "Edit a Programming MCQ" }, { optionIndex: "4", optionText: "Edit an Academic MCQ" }, { optionIndex: "5", optionText: "Delete a MCQ" }, { optionIndex: "6", optionText: "Send Invitation" }, { optionIndex: "7", optionText: "Get Test Link" }, { optionIndex: "8", optionText: "Create a Test" }, { optionIndex: "9", optionText: "Edit a Test" }, { optionIndex: "10", optionText: "Delete a Test" }, { optionIndex: "11", optionText: "List All MCQs" }, { optionIndex: "12", optionText: "Get MCQ" }, { optionIndex: "13", optionText: "List All Tests" }, { optionIndex: "14", optionText: "Evaluate Test" }, { optionIndex: "15", optionText: "Send Test Results to Org" }, { optionIndex: "16", optionText: "Exit" }];

var askUser = function askUser(query) {
    return new Promise(function (resolve, reject) {
        readline.question(query, function (userInput) {
            if (!userInput) reject('no user input received');
            resolve(userInput);
        });
    });
};

var goToSelectedOption = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(menuOption) {
        var mcqImportPath, programmingMcqs, _mcqImportPath, academicMcqs, mcqId, model, testId, emailId, inviteeName, invitees, invitationId, testLink, selection, testModel, _mcqId, _model, entity, questionPrompt, _selection, responseEntity, _invitationId, registrationId, _invitationId2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (adminUser.id) {
                            _context2.next = 2;
                            break;
                        }

                        throw exception('user not initialized');

                    case 2:
                        _context2.t0 = menuOption.optionIndex;
                        _context2.next = _context2.t0 === "1" ? 5 : _context2.t0 === "2" ? 10 : _context2.t0 === "3" ? 15 : _context2.t0 === "4" ? 16 : _context2.t0 === "5" ? 17 : _context2.t0 === "6" ? 27 : _context2.t0 === "7" ? 40 : _context2.t0 === "8" ? 50 : _context2.t0 === "9" ? 51 : _context2.t0 === "10" ? 52 : _context2.t0 === "11" ? 60 : _context2.t0 === "12" ? 61 : _context2.t0 === "14" ? 74 : _context2.t0 === "15" ? 99 : _context2.t0 === "16" ? 106 : 108;
                        break;

                    case 5:
                        mcqImportPath = _path2.default.resolve(config.default.programming.mcqImportPath);
                        programmingMcqs = require(mcqImportPath).getAllQuestions(mcqImportPath);

                        console.log('programmingmcqs length', programmingMcqs.length);
                        // break;
                        programmingMcqs.forEach(function (mcqToAdd) {
                            var mcq_meta = mcqToAdd.mcq_meta;

                            var model = new _McqModel2.default();
                            mcq_meta.createdBy = adminUser.id;
                            mcq_meta.createdOn = new Date().toLocaleDateString();

                            model.Add(mcq_meta).then(function (res) {
                                console.log('MCQ Added', res);
                            }).catch(function (error) {
                                var msg = "Error in add MCQ: " + error;
                                console.log(msg);
                            });
                        });
                        return _context2.abrupt("break", 108);

                    case 10:
                        _mcqImportPath = _path2.default.resolve(config.default.academic.mcqImportPath);
                        academicMcqs = require(_mcqImportPath).getAllQuestions(_mcqImportPath);

                        console.log('academicMcqs length', academicMcqs.length);
                        // break;
                        // let tempMcqs = [ academicMcqs[0] ];
                        academicMcqs.forEach(function (mcqToAdd) {
                            var mcq_meta = mcqToAdd.mcq_meta;

                            var model = new _McqModel2.default();
                            model.GetMcqByDescription(adminUser, mcq_meta.description).then(function (existingMcq) {
                                console.log('existingMcq', existingMcq);

                                if (existingMcq && existingMcq.length === 0) {
                                    mcq_meta.createdBy = adminUser.id;
                                    mcq_meta.createdOn = new Date().toLocaleDateString();

                                    model.AddAcademicMcq(mcq_meta).then(function (res) {
                                        console.log('MCQ Added', res);
                                    }).catch(function (error) {
                                        var msg = "Error in add MCQ: " + error;
                                        console.log(msg);
                                    });
                                } else {
                                    console.log("MCQ already exists, mcqId: " + existingMcq[0].id);
                                }
                            });
                        });
                        return _context2.abrupt("break", 108);

                    case 15:
                        console.log('edit programming mcq');

                    case 16:
                        console.log('edit academic mcq');

                    case 17:
                        mcqId = 128;
                        _context2.next = 20;
                        return askUser(_chalk2.default.yellow.bgBlack('Enter the MCQ Id to be deleted\n'));

                    case 20:
                        mcqId = _context2.sent;

                        console.log("You entered " + mcqId);
                        model = new _McqModel2.default();
                        _context2.next = 25;
                        return model.DeleteById(mcqId);

                    case 25:
                        console.log('MCQ deleted');
                        return _context2.abrupt("break", 108);

                    case 27:
                        testId = 21;
                        _context2.next = 30;
                        return askUser('Enter Test Id to send invite for.\n');

                    case 30:
                        testId = _context2.sent;
                        _context2.next = 33;
                        return askUser('Enter Email Id to send invite to.\n');

                    case 33:
                        emailId = _context2.sent;
                        _context2.next = 36;
                        return askUser('Enter name of the candidate\\student to send invite to.\n');

                    case 36:
                        inviteeName = _context2.sent;
                        invitees = [{
                            emailId: emailId,
                            name: inviteeName
                        }];


                        _InvitationRepo2.default.sendInviteAndGetLink(adminUser.id, invitees[0], testId).then(function (testLink) {
                            console.log("Test registered for email: " + invitees[0].emailId);
                            console.log('testLink:  ', testLink);
                        }).catch(function (err) {
                            var response = { message: 'Error occured in register for test:' + err };
                            console.log(response);
                            console.log("Failed registering test for email: " + invitees[0].emailId);
                        });
                        return _context2.abrupt("break", 108);

                    case 40:
                        invitationId = 164;
                        _context2.next = 43;
                        return askUser(_chalk2.default.yellow.bgBlack('Enter the Invitation Id\n'));

                    case 43:
                        invitationId = _context2.sent;

                        console.log("You entered " + invitationId);
                        _context2.next = 47;
                        return _InvitationRepo2.default.getTestLink(invitationId);

                    case 47:
                        testLink = _context2.sent;

                        console.log(testLink);

                        return _context2.abrupt("break", 108);

                    case 50:
                        console.log('create a test');

                    case 51:
                        console.log('edit a test');

                    case 52:
                        console.log('delete a test');
                        _context2.next = 55;
                        return askUser(_chalk2.default.yellow.bgBlack('Enter Test Id to delete\n'));

                    case 55:
                        selection = _context2.sent;
                        testModel = new _TestModel2.default();
                        _context2.next = 59;
                        return testModel.DeleteTestById(selection);

                    case 59:
                        return _context2.abrupt("break", 108);

                    case 60:
                        console.log('list all mcqs');

                    case 61:
                        _mcqId = 153;
                        _context2.next = 64;
                        return askUser('Enter MCQ Id to retrieve details for\n');

                    case 64:
                        _mcqId = _context2.sent;

                        console.log("you entered " + _mcqId);
                        _model = new _McqModel2.default();

                        console.log('get mcq', _mcqId);
                        _context2.next = 70;
                        return _model.GetMcqById(_mcqId);

                    case 70:
                        entity = _context2.sent;

                        // .then((entity) => {
                        console.log('entity', entity);
                        if (entity) {
                            console.log("McqId " + _mcqId + " returned");
                            console.log(JSON.stringify(entity));
                        } else {
                            console.log("MCQ Id " + _mcqId + " not found");
                        }
                        // });
                        return _context2.abrupt("break", 108);

                    case 74:
                        // let invitationId = 175;
                        // invitationId = await askUser('Enter invitationId to evaluate results for\n');
                        // let responseEntity = await mcqResponseRepo.evaluateResults(invitationId);
                        // console.log(chalk.yellow.bgBlack(`Score: ${responseEntity.response_meta.scorePercentage}`));
                        // console.log(chalk.yellow.bgBlack(`Result: ${responseEntity.response_meta.result}`));

                        questionPrompt = "Which kind of user you want to evaluate results for invited / registered user?\n\n            Select the input Id that you have\n\n            1. Invitation Id\n\n            2. Registration Id\n\n            ";
                        _context2.next = 77;
                        return askUser(_chalk2.default.yellow.bgBlack(questionPrompt));

                    case 77:
                        _selection = _context2.sent;
                        responseEntity = {};

                        if (!(_selection === 1)) {
                            _context2.next = 90;
                            break;
                        }

                        _context2.next = 82;
                        return askUser('Enter invitationId to evaluate results for\n');

                    case 82:
                        _invitationId = _context2.sent;
                        _context2.next = 85;
                        return _McqResponseRepo2.default.evaluateInvitedTestResults(_invitationId);

                    case 85:
                        responseEntity = _context2.sent;

                        console.log(_chalk2.default.yellow.bgBlack("Score: " + responseEntity.response_meta.scorePercentage));
                        console.log(_chalk2.default.yellow.bgBlack("Result: " + responseEntity.response_meta.result));
                        _context2.next = 98;
                        break;

                    case 90:
                        _context2.next = 92;
                        return askUser('Enter registrationId to evaluate results for\n');

                    case 92:
                        registrationId = _context2.sent;
                        _context2.next = 95;
                        return _McqResponseRepo2.default.evaluateRegisteredTestResults(adminUser, registrationId);

                    case 95:
                        responseEntity = _context2.sent;

                        console.log(_chalk2.default.yellow.bgBlack("Score: " + responseEntity.evaluation_meta.scorePercentage));
                        console.log(_chalk2.default.yellow.bgBlack("Result: " + responseEntity.evaluation_meta.result));

                    case 98:
                        return _context2.abrupt("break", 108);

                    case 99:
                        _invitationId2 = 175;
                        _context2.next = 102;
                        return askUser('Enter invitationId to send results for\n');

                    case 102:
                        _invitationId2 = _context2.sent;
                        _context2.next = 105;
                        return _TestResultGenerator2.default.generateAndSendResultsForInvitationId(adminUser, _invitationId2, true);

                    case 105:
                        return _context2.abrupt("break", 108);

                    case 106:
                        console.log('Have a good day!');
                        exitUserInteraction();

                    case 108:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function goToSelectedOption(_x) {
        return _ref2.apply(this, arguments);
    };
}();

var initializeApp = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return setAdminUser();

                    case 2:
                        askUserInput();

                    case 3:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function initializeApp() {
        return _ref3.apply(this, arguments);
    };
}();

var exitUserInteraction = function exitUserInteraction() {
    console.log('Closing user input session');
    readline.close();
    (0, _process.exit)();
};

var askUserInput = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var userInput, selectedOp, continueAnotherOp;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        console.clear();
                        _context4.next = 3;
                        return askUser(_chalk2.default.yellow.bgBlack.bold(buildMenu(menuOptions)));

                    case 3:
                        userInput = _context4.sent;

                        if (!userInput) {
                            _context4.next = 18;
                            break;
                        }

                        selectedOp = {};

                        menuOptions.forEach(function (option) {
                            if (userInput === option.optionIndex) {
                                selectedOp = option;
                            }
                        });

                        if (!selectedOp.optionIndex) {
                            _context4.next = 17;
                            break;
                        }

                        console.log("You have selected: " + selectedOp.optionText);
                        _context4.next = 11;
                        return goToSelectedOption(selectedOp);

                    case 11:
                        _context4.next = 13;
                        return askUser('Do you want to continue? y/n\n');

                    case 13:
                        continueAnotherOp = _context4.sent;

                        if (continueAnotherOp === 'y') {
                            askUserInput();
                        } else {
                            exitUserInteraction();
                        }
                        _context4.next = 18;
                        break;

                    case 17:
                        console.log("You have selected invalid option " + userInput);

                    case 18:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function askUserInput() {
        return _ref4.apply(this, arguments);
    };
}();

initializeApp();
//# sourceMappingURL=app.js.map