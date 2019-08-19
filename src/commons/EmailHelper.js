import nodemailer from 'nodemailer';
import { EmailConfig } from './ServerConfig';

class EmailHelper {

    SendEmail = (emailInfo) => {
        console.log('email helper send called');
        let transporter = nodemailer.createTransport({
            host: EmailConfig.emailSmtpHost,
            port: EmailConfig.emailSmtpPort,
            secure: false,
            requireTLS: true,
            auth: {
                user: EmailConfig.emailAuthUser,
                pass: EmailConfig.emailAuthPassword
            }
        });

        let mailOptions = {
            from: EmailConfig.inviteFromEmailId,
            to: emailInfo.to,
            subject: emailInfo.subject,
            // text: emailInfo.text,
            html: this.CreateHtml(emailInfo)
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log('error occured in sending email');
                console.log(error);
                return;
            }
            console.log('email sent: ' + info.messageId + ', resp: ' + info.response);
        })
    }

    CreateHtml = (emailInfo) => {
        let html = htmlTemplate;
        html = html.replace('$$test_name$$', emailInfo.testName + ' Challenge');
        html = html.replace('$$test_link$$', emailInfo.testLink);

        return html;
    }
}
export default EmailHelper;

const htmlTemplate = `
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