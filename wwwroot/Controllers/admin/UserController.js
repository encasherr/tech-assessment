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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserController = function (_BaseController) {
    _inherits(UserController, _BaseController);

    function UserController() {
        var _ref;

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
            // let userObj=req.body.user;
            // let dbuser=userModel.Add(userObj);
            // resp.status(200).send(dbuser);
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
        }, _this.Update = function (req, resp) {
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