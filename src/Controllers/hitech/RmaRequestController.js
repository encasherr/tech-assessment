import db from '../../db';
import EmailHelper from '../../commons/EmailHelper';
import { EmailConfig } from '../../commons/ServerConfig';

class RmaRequestController {
    GetAll = (req, resp) => {
        console.log('get all rma requests called');
        let rmaRequests = this.initializeCollection();
        console.log(rmaRequests.data.length);
        resp.send(rmaRequests.data);
    }

    Add = (req, resp) => {
        console.log('Add rma request called');
        console.log(req.body);
        let rmaToAdd = req.body;
        let rmaRequests = this.initializeCollection();
        let rmaCreated = rmaRequests.insert(rmaToAdd);
        db.saveDatabase();
        //send email
        let emailInfo = {
            to: rmaToAdd.emailTo,
            subject: 'RMA Request Submitted',
            notificationType: 'rma',
            rmaRequest: rmaCreated,
            rmaLink: this.generate_rma_link(rmaCreated['$loki'])
        };
        let emailHelper = new EmailHelper();
        emailHelper.SendEmail(emailInfo);
        
        resp.send(JSON.stringify(req.body));
    }

    generate_rma_link = (rmaRequestId) => {
        let link = EmailConfig.rmaLinkPrefix + rmaRequestId;
        return link;
    }


    Update = (req, resp) => {
        console.log('update rmaRequests called');
        console.log(req.body);
        let rmaRequests = this.initializeCollection();
        let rmaRequestToUpdate = rmaRequests.find({ '$loki': req.body.$loki });
        if(rmaRequestToUpdate && rmaRequestToUpdate.length > 0) {
            //categoryToUpdate[0].title = req.body.title;
            //categoryToUpdate[0].description = req.body.description;
            //categories.update(categoryToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete rma request called', req.query.rmaRequestId);
        let rmaRequests = this.initializeCollection();
        console.log('rmaRequests length', rmaRequests.data.length);
        let rmaRequestToDelete = rmaRequests.chain().find({ '$loki': +req.query.rmaRequestId });
        if(rmaRequestToDelete) {
            rmaRequestToDelete.remove();
            db.saveDatabase();
            console.log('deleted ' + req.query.rmaRequestId);
            resp.send('deleted ' + req.query.rmaRequestId);
        }
        else {
            console.log('nothing to delete');
            resp.send('nothing to delete');
        }
    }

    initializeCollection = () => {
        let rmaRequests = db.getCollection('rmaRequests');
        if(! rmaRequests) {
            rmaRequests = db.addCollection('rmaRequests');
        }
        return rmaRequests;
    }
}

export default new RmaRequestController
