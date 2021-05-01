'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

    this.Add = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity).then(function (insertId) {
                resolve(insertId);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.Update = function (entity) {
        entity.user_meta.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.user_meta, entity.id).then(function (res) {
                resolve(res);
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
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userIv, userContent) {
            var userId, userEntity;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            userId = (0, _general.decrypt)(userIv, userContent);

                            console.log('decryption result: ', userId);

                            if (!userId) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 5;
                            return _this.GetUser(userId);

                        case 5:
                            userEntity = _context.sent;
                            return _context.abrupt('return', userEntity);

                        case 7:
                            return _context.abrupt('return', null);

                        case 8:
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

    this.SendVerificationEmail = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId) {
            var userEntity, userDetail, encryptedObject, verificationLink, emailInfo, emailHelper;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _this.GetUser(userId);

                        case 2:
                            userEntity = _context2.sent;
                            userDetail = {
                                userId: userId,
                                email: userEntity.user_meta.emailId,
                                name: userEntity.user_meta.name
                            };
                            encryptedObject = (0, _general.encrypt)('' + userDetail.userId);

                            console.log('encryptedObject in model: ', encryptedObject);
                            _context2.t0 = _ServerConfig.EmailConfig;
                            _context2.next = 9;
                            return (0, _general.getSiteUrl)();

                        case 9:
                            _context2.t1 = _context2.sent;
                            _context2.t2 = encryptedObject;
                            verificationLink = _context2.t0.getVerificationLink.call(_context2.t0, _context2.t1, _context2.t2);

                            console.log('verification link: ', verificationLink);
                            emailInfo = {
                                to: userDetail.email,
                                subject: 'Welcome - Verify user email',
                                user_name: userEntity.user_meta.name,
                                verification_link: verificationLink,
                                notificationType: 'verify_user_email'
                            };
                            emailHelper = new _EmailHelper2.default();

                            emailHelper.SendEmail(emailInfo);

                        case 16:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x3) {
            return _ref2.apply(this, arguments);
        };
    }();
};

exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map