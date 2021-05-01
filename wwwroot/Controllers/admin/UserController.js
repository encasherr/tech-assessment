'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _users = require('../../users');

var _users2 = _interopRequireDefault(_users);

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _UserModel = require('../../Models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _DbConfig = require('../../commons/DbConfig');

var _DbConfig2 = _interopRequireDefault(_DbConfig);

var _general = require('../../utils/general');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserController = function (_BaseController) {
    _inherits(UserController, _BaseController);

    function UserController() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, UserController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UserController.__proto__ || Object.getPrototypeOf(UserController)).call.apply(_ref, [this].concat(args))), _this), _this.LoadConfig = function (req, resp) {
            var dbConfig = new _DbConfig2.default();
            dbConfig.Initialize().then(function (KeyValues) {
                resp.status(200).json(KeyValues);
            }).catch(function (err) {
                resp.status(500).json({ message: 'Exception in loading config: ' + err });
            });
        }, _this.GetAll = function (req, resp) {
            console.log('get all users called', req.user);

            var model = new _UserModel2.default();
            model.GetAll(req.user).then(function (res) {
                console.log('users retrieved');
                resp.status(200).json(res);
            }).catch(function (error) {
                var msg = "Error in fetching users: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.Add = function (req, resp) {
            console.log('add user called');
            console.log(req.body);
            var userToAdd = req.body;
            userToAdd = req.body.user_meta;

            userToAdd.createdBy = req.user.id;
            userToAdd.createdOn = new Date().toLocaleDateString();

            var model = new _UserModel2.default();
            model.Add(userToAdd).then(function (res) {
                if (res) {
                    console.log('User Added');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in adding User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.AddNewUserToBeVerified = function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, resp) {
                var userToAdd, verificationLink, model, userId, msg;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('new user to be confirmed called');
                                console.log(req.body);
                                userToAdd = req.body.user_meta;


                                userToAdd.createdBy = 'self';
                                userToAdd.status = 'pending verification';
                                userToAdd.createdOn = new Date().toLocaleDateString();

                                verificationLink = '';
                                model = new _UserModel2.default();
                                _context.next = 10;
                                return model.Add(userToAdd).catch(function (err) {
                                    var msg = "Error while adding User: " + error;
                                    console.log(msg);
                                    resp.status(500).send(msg);
                                });

                            case 10:
                                userId = _context.sent;

                                if (!userId) {
                                    _context.next = 18;
                                    break;
                                }

                                console.log('User Added, Id: ', userId);
                                _context.next = 15;
                                return model.SendVerificationEmail(userId).catch(function (err) {
                                    var msg = "Error while sending email: " + err;
                                    console.log(msg);
                                    resp.status(500).send(msg);
                                });

                            case 15:
                                resp.status(200).send(JSON.stringify(userToAdd));
                                _context.next = 21;
                                break;

                            case 18:
                                // })
                                // .catch((error) => {
                                msg = "Could not add user. Try after some time";

                                console.log(msg);
                                resp.status(500).send(msg);

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }));

            return function (_x, _x2) {
                return _ref2.apply(this, arguments);
            };
        }(), _this.VerifyUser = function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, resp) {
                var _req$query, userIv, userContent, model, userToUpdate, msg;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                console.log('Verify user called');
                                console.log(req.query);
                                _req$query = req.query, userIv = _req$query.userIv, userContent = _req$query.userContent;

                                console.log('calling decrypt on ', userIv, userContent);
                                model = new _UserModel2.default();
                                _context3.next = 7;
                                return model.VerifyUser(userIv, userContent).catch(function (err) {
                                    var msg = 'User not found or verification link expired. Please sign up again to use the website.';
                                    resp.status(200).send(msg);
                                    return;
                                });

                            case 7:
                                userToUpdate = _context3.sent;

                                if (!(userToUpdate && userToUpdate.user_meta)) {
                                    _context3.next = 12;
                                    break;
                                }

                                userToUpdate.user_meta.status = 'verified';
                                _context3.next = 15;
                                break;

                            case 12:
                                msg = 'User not found or verification link expired. Please sign up again to use the website.';

                                resp.status(200).send(msg);
                                return _context3.abrupt('return');

                            case 15:
                                model.Update(userToUpdate).then(function () {
                                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(res) {
                                        var homePage, fileName, url;
                                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                            while (1) {
                                                switch (_context2.prev = _context2.next) {
                                                    case 0:
                                                        if (!res) {
                                                            _context2.next = 9;
                                                            break;
                                                        }

                                                        homePage = (0, _general.getHomePagePath)();
                                                        fileName = homePage;
                                                        // resp.sendFile(fileName);

                                                        _context2.next = 5;
                                                        return (0, _general.getSiteUrl)();

                                                    case 5:
                                                        _context2.t0 = _context2.sent;
                                                        url = _context2.t0 + 'emailVerified';

                                                        console.log('User Updated, redirecting to ', url);
                                                        // resp.writeHead(301,
                                                        //     { Location: url }
                                                        //   );
                                                        resp.redirect(url);

                                                    case 9:
                                                    case 'end':
                                                        return _context2.stop();
                                                }
                                            }
                                        }, _callee2, _this2);
                                    }));

                                    return function (_x5) {
                                        return _ref4.apply(this, arguments);
                                    };
                                }()).catch(function (error) {
                                    var msg = "Error in updating User: " + error;
                                    console.log(msg);
                                    resp.status(500).send(msg);
                                });

                            case 16:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2);
            }));

            return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
            };
        }(), _this.Update = function (req, resp) {
            console.log('update user called');
            // let userObj = req.body.user;
            // let dbuser = userModel.UpdateUser(userObj.emailId, userObj);
            // resp.status(200).send(dbuser);
            console.log(req.body);
            var model = new _UserModel2.default();
            model.Update(req.body).then(function (res) {
                if (res) {
                    console.log('User Updated');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in updating User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.Delete = function (req, resp) {
            console.log('delete user called');
            console.log(req.body);
            // let userObj = req.body.user;
            // userModel.DeleteUser(userObj.emailId);
            // resp.status(200).send('success');
            var model = new _UserModel2.default();
            model.Delete(req.body).then(function (res) {
                if (res) {
                    console.log('User deleted');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in deleting User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return UserController;
}(_BaseController3.default);

exports.default = new UserController();
//# sourceMappingURL=UserController.js.map