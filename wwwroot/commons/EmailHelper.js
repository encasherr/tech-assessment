'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _ServerConfig = require('./ServerConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmailHelper = function EmailHelper() {
    var _this = this;

    _classCallCheck(this, EmailHelper);

    this.SendEmail = function (emailInfo) {
        console.log('email helper send called');
        var transporter = _nodemailer2.default.createTransport({
            host: _ServerConfig.EmailConfig.emailSmtpHost,
            port: _ServerConfig.EmailConfig.emailSmtpPort,
            secure: false,
            requireTLS: true,
            auth: {
                user: _ServerConfig.EmailConfig.emailAuthUser,
                pass: _ServerConfig.EmailConfig.emailAuthPassword
            }
        });

        var mailOptions = {
            from: _ServerConfig.EmailConfig.inviteFromEmailId,
            to: emailInfo.to,
            subject: emailInfo.subject,
            // text: emailInfo.text,
            html: _this.CreateHtml(emailInfo)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('error occured in sending email');
                console.log(error);
                return;
            }
            console.log('email sent: ' + info.messageId + ', resp: ' + info.response);
        });
    };

    this.CreateHtml = function (emailInfo) {
        var html = htmlTemplate;
        html = html.replace('$$test_name$$', emailInfo.testName + ' Challenge');
        html = html.replace('$$test_link$$', emailInfo.testLink);

        return html;
    };
};

exports.default = EmailHelper;


var htmlTemplate = '\n<style>\n.MuiTypography-subtitle1-87 {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 1rem;\n    font-family: "Roboto", "Helvetica", "Arial", sans-serif;\n    font-weight: 400;\n    line-height: 1.75;\n    letter-spacing: 0.00938em;\n}\n.MuiTypography-alignCenter-92 {\n    text-align: center;\n}\n.MuiTypography-root-69 {\n    margin: 0;\n    display: block;\n}\n.MuiTypography-button-80 {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    font-weight: 500;\n    font-family: "Roboto", "Helvetica", "Arial", sans-serif;\n    text-transform: uppercase;\n}\n.MuiDivider-root-117 {\n    height: 1px;\n    margin: 0;\n    border: none;\n    flex-shrink: 0;\n    background-color: rgba(0, 0, 0, 0.12);\n}\n.MuiButton-sizeLarge-1131 {\n    padding: 8px 24px;\n    font-size: 0.9375rem;\n}\n.MuiButton-contained-1118 {\n    color: rgba(0, 0, 0, 0.87);\n    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);\n    background-color: #e0e0e0;\n}\n.MuiButton-root-1107 {\n    color: rgba(0, 0, 0, 0.87);\n    padding: 6px 16px;\n    font-size: 0.875rem;\n    min-width: 64px;\n    box-sizing: border-box;\n    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n    line-height: 1.75;\n    font-weight: 500;\n    font-family: "Roboto", "Helvetica", "Arial", sans-serif;\n    border-radius: 4px;\n    text-transform: uppercase;\n}\n.MuiButtonBase-root-57 {\n    color: inherit;\n    border: 0;\n    margin: 0;\n    cursor: pointer;\n    display: inline-flex;\n    outline: none;\n    padding: 0;\n    position: relative;\n    align-items: center;\n    user-select: none;\n    border-radius: 0;\n    vertical-align: middle;\n    justify-content: center;\n    -moz-appearance: none;\n    text-decoration: none;\n    background-color: transparent;\n    -webkit-appearance: none;\n    -webkit-tap-highlight-color: transparent;\n}\n.MuiButton-label-1108 {\n    width: 100%;\n    display: inherit;\n    align-items: inherit;\n    justify-content: inherit;\n}\n.MuiTouchRipple-root-259 {\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: block;\n    z-index: 0;\n    position: absolute;\n    overflow: hidden;\n    border-radius: inherit;\n    pointer-events: none;\n}\n.MuiButton-containedSecondary-1120 {\n    color: #fff;\n    background-color: #f50057;\n    border-radius: 4px;\n    padding: 1%;\n}\na {\n    text-decoration: none;\n}\nbutton {\n    align-items: flex-start;\n    text-align: center;\n    cursor: default;\n    color: buttontext;\n    background-color: buttonface;\n    box-sizing: border-box;\n    padding: 2px 6px 3px;\n    border-width: 2px;\n    border-style: outset;\n    border-color: buttonface;\n    border-image: initial;\n}\nbutton {\n    -webkit-writing-mode: horizontal-tb !important;\n}\n.MuiDivider-root-117 {\n    height: 1px;\n    margin: 0;\n    border: none;\n    flex-shrink: 0;\n    background-color: rgba(0, 0, 0, 0.12);\n}\nhr {\n    display: block;\n    unicode-bidi: isolate;\n    margin-block-start: 0.5em;\n    margin-block-end: 0.5em;\n    margin-inline-start: auto;\n    margin-inline-end: auto;\n    overflow: hidden;\n    border-style: inset;\n    border-width: 1px;\n}\n.MuiTypography-gutterBottom-96 {\n    margin-bottom: 0.35em;\n}\n.MuiTypography-alignCenter-92 {\n    text-align: center;\n}\n.MuiTypography-subtitle2-88 {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 0.875rem;\n    font-family: "Roboto", "Helvetica", "Arial", sans-serif;\n    font-weight: 500;\n    line-height: 1.57;\n    letter-spacing: 0.00714em;\n}\n.MuiTypography-headline-74 {\n    color: rgba(0, 0, 0, 0.87);\n    font-size: 1.9rem;\n    font-weight: 600;\n    font-family: "Roboto", "Helvetica", "Arial", sans-serif;\n    line-height: 1.65417em;\n    text-align: center;\n    padding: 2%;\n}\n</style>\n<body>\n<span class="MuiTypography-root-69 MuiTypography-headline-74 MuiCardHeader-title-1042">$$test_name$$</span>\n<h3 class="MuiTypography-root-69 MuiTypography-subtitle1-87 MuiTypography-alignCenter-92">\nYou have been invited to attend the Junior C# developer challenge. We wish you all the best!\n</h3>\n<div style="margin-top: 2%;">\n<span class="MuiTypography-root-69 MuiTypography-button-80 MuiTypography-alignCenter-92">\nDuration: 90 mins\n<br><br>\n<a href="$$test_link$$" style="margin-top: 2%;">\n<button class="MuiButtonBase-root-57 MuiButton-root-1107 MuiButton-contained-1118 MuiButton-containedSecondary-1120 MuiButton-raised-1121 MuiButton-raisedSecondary-1123 MuiButton-sizeLarge-1131" tabindex="0" type="button" align="center">\n<span class="MuiButton-label-1108">\nStart Challenge\n</span>\n<span class="MuiTouchRipple-root-259"></span>\n</button>\n</a>\n</span>\n</div>\n<hr class="MuiDivider-root-117" style="margin-top: 2%;">\n<h6 class="MuiTypography-root-69 MuiTypography-subtitle2-88 MuiTypography-gutterBottom-96 MuiTypography-alignCenter-92" style="margin-top: 2%;">\nFor any technical queries, please refer to <a href="#">FAQ</a> or email us at support@techassessment.com\n</h6>\n</body>\n';
//# sourceMappingURL=EmailHelper.js.map