'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _ServerConfig = require('./ServerConfig');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var EmailHelper = function EmailHelper() {
    var _this = this;

    _classCallCheck(this, EmailHelper);

    this.CreateTransporter = function () {
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
        return transporter;
    };

    this.SendEmailWithAttachment = function (emailInfo) {
        var transporter = _this.CreateTransporter();
        var mailOptions = {
            from: _ServerConfig.EmailConfig.inviteFromEmailId,
            to: emailInfo.to,
            subject: emailInfo.subject,
            text: emailInfo.text,
            attachments: [{
                path: emailInfo.attachmentPath
            }]
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

    this.SendEmail = function (emailInfo) {
        console.log('email helper send called');
        return new Promise(function (resolve, reject) {

            var transporter = _this.CreateTransporter();
            var mailOptions = {
                from: _ServerConfig.EmailConfig.inviteFromEmailId,
                to: emailInfo.to,
                bcc: _ServerConfig.EmailConfig.inviteFromEmailId,
                enevelope: {
                    from: _ServerConfig.EmailConfig.inviteFromEmailId,
                    to: emailInfo.to
                },
                subject: emailInfo.subject,
                // text: emailInfo.text,
                html: _this.CreateHtml(emailInfo)
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('error occured in sending email');
                    console.log(error);
                    reject(error);
                } else {
                    resolve();
                    console.log('email sent: ' + info.messageId + ', resp: ' + info.response);
                }
            });

            _this.LogEmail(mailOptions);
        });
    };

    this.CreateHtml = function (emailInfo) {
        var html = _this.GetHtmlTemplateByType(emailInfo);
        if (emailInfo.notificationType === 'test') {
            html = html.replace('$$test_name$$', emailInfo.testName);
            html = html.replace('$$test_title$$', emailInfo.testName);
            html = html.replace('$$test_link$$', emailInfo.testLink);
            html = html.replace('$$test_duration$$', emailInfo.testDuration);
            html = html.replace('$$faq_link$$', emailInfo.faqLink);
        }
        if (emailInfo.notificationType === 'rma') {
            if (emailInfo.rmaRequest.customerDetails) {
                html = html.replace('$$customer_name$$', emailInfo.rmaRequest.customerDetails.customerName);
                html = html.replace('$$telephone$$', emailInfo.rmaRequest.customerDetails.telephone);
                html = html.replace('$$contact_person$$', emailInfo.rmaRequest.customerDetails.contactPerson);
                html = html.replace('$$rma_link$$', emailInfo.rmaLink);
            }
        }
        if (emailInfo.notificationType === 'verify_user_email') {
            html = html.replace('$$user_name$$', emailInfo.user_name);
            html = html.replace('$$verification_link$$', emailInfo.verification_link);
        }
        if (emailInfo.notificationType === 'test_result_email') {
            html = emailInfo.invokeReplaceFunction(html);
        }
        return html;
    };

    this.LogEmail = function (mailOptions) {
        var fileName = 'EmailLogs.html';
        var filePath = _path2.default.resolve(fileName);
        console.log('Log file path: ' + filePath);
        var contentToLog = '';
        contentToLog += 'From: ' + mailOptions.from + '\\n';
        contentToLog += 'To: ' + mailOptions.to + '\\n';
        contentToLog += 'Subject: ' + mailOptions.subject + '\\n';
        contentToLog += '\n\n' + mailOptions.html;
        contentToLog += '\n\n------------------End of message-------------------\n\n';
        fs.appendFileSync(filePath, contentToLog);
    };

    this.GetHtmlTemplateByType = function (emailInfo) {
        var html = '';

        switch (emailInfo.notificationType) {
            case 'test':
                {
                    var file = _path2.default.resolve(__dirname + '/testinvitationTemplate.html');
                    console.log('template path', file);
                    html = fs.readFileSync(file, { encoding: 'utf8' });
                    break;
                }
            case 'rma':
                {
                    var _file = _path2.default.resolve(__dirname + '/rmatemplate.html');
                    console.log('template path', _file);
                    html = fs.readFileSync(_file, { encoding: 'utf8' });
                    break;
                }
            case 'verify_user_email':
                {
                    var _file2 = _path2.default.resolve(__dirname + '/EmailTemplates/VerifyUserTemplate.html');
                    console.log('template path', _file2);
                    html = fs.readFileSync(_file2, { encoding: 'utf8' });
                    break;
                }
            case 'test_result_email':
                {
                    var _file3 = _path2.default.resolve(__dirname + '/EmailTemplates/TestResultTemplate.html');
                    console.log('template path', _file3);
                    html = fs.readFileSync(_file3, { encoding: 'utf8' });
                    break;
                }
        }
        return html;
    };
};

exports.default = EmailHelper;

/*const htmlTemplate = `
<style>
.MuiTypography-subtitle1-87 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 1rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.75;
    letter-spacing: 0.00938em;
}
.MuiTypography-alignCenter-92 {
    text-align: center;
}
.MuiTypography-root-69 {
    margin: 0;
    display: block;
}
.MuiTypography-button-80 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    font-weight: 500;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    text-transform: uppercase;
}
.MuiDivider-root-117 {
    height: 1px;
    margin: 0;
    border: none;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.12);
}
.MuiButton-sizeLarge-1131 {
    padding: 8px 24px;
    font-size: 0.9375rem;
}
.MuiButton-contained-1118 {
    color: rgba(0, 0, 0, 0.87);
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
    background-color: #e0e0e0;
}
.MuiButton-root-1107 {
    color: rgba(0, 0, 0, 0.87);
    padding: 6px 16px;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    line-height: 1.75;
    font-weight: 500;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    border-radius: 4px;
    text-transform: uppercase;
}
.MuiButtonBase-root-57 {
    color: inherit;
    border: 0;
    margin: 0;
    cursor: pointer;
    display: inline-flex;
    outline: none;
    padding: 0;
    position: relative;
    align-items: center;
    user-select: none;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    -moz-appearance: none;
    text-decoration: none;
    background-color: transparent;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
}
.MuiButton-label-1108 {
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
}
.MuiTouchRipple-root-259 {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 0;
    position: absolute;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
}
.MuiButton-containedSecondary-1120 {
    color: #fff;
    background-color: #f50057;
    border-radius: 4px;
    padding: 1%;
}
a {
    text-decoration: none;
}
button {
    align-items: flex-start;
    text-align: center;
    cursor: default;
    color: buttontext;
    background-color: buttonface;
    box-sizing: border-box;
    padding: 2px 6px 3px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonface;
    border-image: initial;
}
button {
    -webkit-writing-mode: horizontal-tb !important;
}
.MuiDivider-root-117 {
    height: 1px;
    margin: 0;
    border: none;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 0.12);
}
hr {
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
}
.MuiTypography-gutterBottom-96 {
    margin-bottom: 0.35em;
}
.MuiTypography-alignCenter-92 {
    text-align: center;
}
.MuiTypography-subtitle2-88 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    line-height: 1.57;
    letter-spacing: 0.00714em;
}
.MuiTypography-headline-74 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 1.9rem;
    font-weight: 600;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.65417em;
    text-align: center;
    padding: 2%;
}
</style>
<body>
<span class="MuiTypography-root-69 MuiTypography-headline-74 MuiCardHeader-title-1042">$$test_name$$</span>
<h3 class="MuiTypography-root-69 MuiTypography-subtitle1-87 MuiTypography-alignCenter-92">
You have been invited to attend the Junior C# developer challenge. We wish you all the best!
</h3>
<div style="margin-top: 2%;">
<span class="MuiTypography-root-69 MuiTypography-button-80 MuiTypography-alignCenter-92">
Duration: 90 mins
<br><br>
<a href="$$test_link$$" style="margin-top: 2%;">
<button class="MuiButtonBase-root-57 MuiButton-root-1107 MuiButton-contained-1118 MuiButton-containedSecondary-1120 MuiButton-raised-1121 MuiButton-raisedSecondary-1123 MuiButton-sizeLarge-1131" tabindex="0" type="button" align="center">
<span class="MuiButton-label-1108">
Start Challenge
</span>
<span class="MuiTouchRipple-root-259"></span>
</button>
</a>
</span>
</div>
<hr class="MuiDivider-root-117" style="margin-top: 2%;">
<h6 class="MuiTypography-root-69 MuiTypography-subtitle2-88 MuiTypography-gutterBottom-96 MuiTypography-alignCenter-92" style="margin-top: 2%;">
For any technical queries, please refer to <a href="#">FAQ</a> or email us at support@techassessment.com
</h6>
</body>
`;
*/
//# sourceMappingURL=EmailHelper.js.map