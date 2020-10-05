"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EmailHelper = require("../commons/EmailHelper");

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _ServerConfig = require("../commons/ServerConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseController = function BaseController() {
    _classCallCheck(this, BaseController);

    this.EmailSnapshot = function (action) {
        console.log("Emailing snapshot after " + action + " action");
        var emailInfo = {
            to: 'reachme.alok@gmail.com',
            subject: "Emailing snapshot after " + action + " action",
            attachmentPath: _ServerConfig.DbConfig.filePath
        };
        var emailHelper = new _EmailHelper2.default();
        emailHelper.SendEmailWithAttachment(emailInfo);
        console.log('snapshot sent');
    };
};

exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map