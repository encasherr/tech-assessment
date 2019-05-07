import nodemailer from 'nodemailer';

class EmailHelper {
    SendEmail = (emailInfo) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'alok.coolaj@gmail.com',
                pass: 'actionChange'
            }
        });
        let mailOptions = {
            from: 'alok.coolaj@gmail.com',
            to: emailInfo.to,
            subject: emailInfo.subject,
            text: emailInfo.text,
            html: '<b>This is a Test Email</b>'
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
}
export default new EmailHelper();