'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _users = require('../users');

var _users2 = _interopRequireDefault(_users);

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _RoleDefinitions = require('../commons/RoleDefinitions');

var _UserQueries = require('../commons/RoleBasedQueries/UserQueries');

var _general = require('../utils/general');

var _EmailHelper = require('../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _ServerConfig = require('../commons/ServerConfig');

var _HelperFunctions = require('../commons/HelperFunctions');

var _DbConfig = require('../commons/DbConfig');

var _DbConfig2 = _interopRequireDefault(_DbConfig);

var _CandidateModel = require('./CandidateModel');

var _CandidateModel2 = _interopRequireDefault(_CandidateModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from './db';


var UserModel =

/*initializeCollection = () => {
    var promise = new Promise((resolve, reject) => {
        db.getCollection(this.entityName)
            .then((res) => {
                this.entities = res;
                resolve(this.entities);
            }).catch((err) => {
                console.log('error occurred: ', err);
                reject(err);
            })
    });
    return promise;
}*/
function UserModel() {
    var _this = this;

    _classCallCheck(this, UserModel);

    this.entityName = 'users';
    this.entities = {};

    this.GetAll = function (userEntity) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_UserQueries.VIEW_USERS);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, userEntity);
    };

    this.GetUser = function (userId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, userId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.GetUserByEmail = function (emailId) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getUserByEmailIdQuery(emailId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                resolve(res);
            });
        });
    };

    this.CheckUserCredentials = function (emailId, password) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.checkUserCredentials(emailId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                if (res && res.length > 0) {
                    var userRow = res[0];
                    console.log('userRow', userRow);
                    var compareResult = (0, _general.comparePasswordHash)(password, userRow.password);
                    console.log('compareResult', compareResult);
                    if (compareResult) {
                        resolve(res[0]);
                    } else {
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.ChangePassword = function (currentPassword, password, userEntity) {
        return new Promise(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var currentUser, newPassword, sql;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _this.CheckUserCredentials(userEntity.emailId, currentPassword);

                            case 2:
                                currentUser = _context.sent;

                                if (currentUser) {
                                    newPassword = (0, _general.createPasswordHash)(password);
                                    sql = 'update ta_users set password = \'' + newPassword + '\' where id = ' + userEntity.id;

                                    _mysqldb2.default.executeQuery(sql).then(function (res) {
                                        resolve(true);
                                    });
                                } else {
                                    reject('Current password is invalid');
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    };

    this.Add = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity).then(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(insertId) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (!insertId) {
                                        _context2.next = 4;
                                        break;
                                    }

                                    _context2.next = 3;
                                    return _this.CreateCandidateOrStudent(insertId);

                                case 3:
                                    resolve(insertId);

                                case 4:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                return function (_x3) {
                    return _ref2.apply(this, arguments);
                };
            }()).catch(function (err) {
                reject(err);
            });
        });
    };

    this.AddCustom = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insertCustom(_this.entityName, entity).then(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(insertId) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    if (!insertId) {
                                        _context3.next = 4;
                                        break;
                                    }

                                    _context3.next = 3;
                                    return _this.CreateCandidateOrStudent(insertId);

                                case 3:
                                    resolve(insertId);

                                case 4:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this);
                }));

                return function (_x4) {
                    return _ref3.apply(this, arguments);
                };
            }()).catch(function (err) {
                reject(err);
            });
        });
    };

    this.CreateCandidateOrStudent = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
            var userToAdd, candidateModel, candEntity;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _this.GetUser(userId);

                        case 2:
                            userToAdd = _context4.sent;

                            if (!(userToAdd.user_meta.role === _RoleDefinitions.candidate || userToAdd.user_meta.role === _RoleDefinitions.student)) {
                                _context4.next = 8;
                                break;
                            }

                            candidateModel = new _CandidateModel2.default();
                            candEntity = {
                                candidate_meta: {
                                    name: userToAdd.user_meta.name,
                                    email: userToAdd.user_meta.emailId
                                },
                                user_id: userId
                            };
                            _context4.next = 8;
                            return candidateModel.AddCandidate(candEntity);

                        case 8:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this);
        }));

        return function (_x5) {
            return _ref4.apply(this, arguments);
        };
    }();

    this.Update = function (entity) {
        entity.user_meta.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.user_meta, entity.id).then(function (res) {
                resolve(res);
            });
        });
    };

    this.UpdateCustom = function (entity) {
        entity.user_meta.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.updateCustom(_this.entityName, entity, entity.id).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.Delete = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.delete(_this.entityName, entity.id);
            resolve(entity.user_meta);
        });
    };

    this.VerifyUser = function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userIv, userContent) {
            var userId, userEntity;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            userId = (0, _general.decrypt)(userIv, userContent);

                            console.log('decryption result: ', userId);

                            if (!userId) {
                                _context5.next = 7;
                                break;
                            }

                            _context5.next = 5;
                            return _this.GetUser(userId);

                        case 5:
                            userEntity = _context5.sent;
                            return _context5.abrupt('return', userEntity);

                        case 7:
                            return _context5.abrupt('return', null);

                        case 8:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }));

        return function (_x6, _x7) {
            return _ref5.apply(this, arguments);
        };
    }();

    this.SendVerificationEmail = function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId) {
            var dbConfig, KeyValues, siteUrl, userEntity, userDetail, encryptedObject, verificationLink, emailInfo, emailHelper;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            dbConfig = new _DbConfig2.default();
                            _context6.next = 3;
                            return dbConfig.Initialize();

                        case 3:
                            KeyValues = _context6.sent;
                            siteUrl = KeyValues ? KeyValues.site_url ? KeyValues.site_url : '' : '';
                            _context6.next = 7;
                            return _this.GetUser(userId);

                        case 7:
                            userEntity = _context6.sent;
                            userDetail = {
                                userId: userId,
                                email: userEntity.user_meta.emailId,
                                name: userEntity.user_meta.name
                            };
                            encryptedObject = (0, _general.encrypt)('' + userDetail.userId);

                            console.log('encryptedObject in model: ', encryptedObject);
                            verificationLink = _ServerConfig.EmailConfig.getVerificationLink(siteUrl, encryptedObject);

                            console.log('verification link: ', verificationLink);
                            emailInfo = {
                                to: userDetail.email,
                                subject: 'Welcome - Verify user email',
                                user_name: userEntity.user_meta.name,
                                verification_link: verificationLink,
                                notificationType: 'verify_user_email'
                            };
                            emailHelper = new _EmailHelper2.default();

                            emailHelper.SendEmail(emailInfo).then(function () {
                                var entityToUpdate = _extends({}, userEntity);
                                entityToUpdate.user_meta.emailStatus = 'Verification Email Sent on ' + (0, _HelperFunctions.getCurrentDateTime)();
                                _this.Update(entityToUpdate);
                            }).catch(function (err) {
                                var entityToUpdate = _extends({}, userEntity);
                                entityToUpdate.user_meta.emailStatus = 'Email Sending Failed';
                                _this.Update(entityToUpdate);
                            });

                        case 16:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this);
        }));

        return function (_x8) {
            return _ref6.apply(this, arguments);
        };
    }();
};

exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map