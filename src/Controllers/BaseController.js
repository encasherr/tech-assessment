import EmailHelper from "../commons/EmailHelper";
import { DbConfig } from "../commons/ServerConfig";

class BaseController {
    EmailSnapshot = (action) => {
        console.log(`Emailing snapshot after ${action} action`);
        let emailInfo = {
            to: 'reachme.alok@gmail.com',
            subject: `Emailing snapshot after ${action} action`,
            attachmentPath: DbConfig.filePath
        };
        let emailHelper = new EmailHelper();
        emailHelper.SendEmailWithAttachment(emailInfo);
        console.log('snapshot sent');
    } 
 
}
export default BaseController;