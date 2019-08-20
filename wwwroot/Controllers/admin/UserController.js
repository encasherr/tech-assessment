'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _users = require('../../users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function UserController() {
    _classCallCheck(this, UserController);

    this.GetAll = function (req, resp) {
        var allusers = _users2.default.GetAll();
        resp.status(200).send(allusers);
    };

    this.Add = function (req, resp) {
        console.log('add user called');
        var userObj = req.body.user;
        var dbuser = _users2.default.Add(userObj);
        resp.status(200).send(dbuser);
    };

    this.Update = function (req, resp) {
        console.log('update user called');
        var userObj = req.body.user;
        var dbuser = _users2.default.UpdateUser(userObj.emailId, userObj);
        resp.status(200).send(dbuser);
    };

    this.Delete = function (req, resp) {
        console.log('delete user called');
        var userObj = req.body.user;
        _users2.default.DeleteUser(userObj.emailId);
        resp.status(200).send('success');
    };
};

exports.default = new UserController();
//# sourceMappingURL=UserController.js.map