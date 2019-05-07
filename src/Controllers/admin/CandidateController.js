import db from '../../db';
import EmailHelper from '../../commons/EmailHelper';

class CandidateController {
    GetAll = (req, resp) => {
        console.log('get all candidates called');
        let candidates = this.initializeCollection();
        console.log(candidates.data.length);
        resp.send(candidates.data);
    }

    Add = (req, resp) => {
        console.log('Add Candidate called');
        console.log(req.body);
        let candidates = this.initializeCollection();
        candidates.insert(req.body);
        db.saveDatabase();
        resp.send(JSON.stringify(req.body));
    }

    Update = (req, resp) => {
        console.log('update candidate called');
        console.log(req.body);
        let candidates = this.initializeCollection();
        let candidateToUpdate = candidates.find({ '$loki': req.body.$loki });
        if(candidateToUpdate && candidateToUpdate.length > 0) {
            candidateToUpdate[0].title = req.body.title;
            candidateToUpdate[0].description = req.body.description;
            candidates.update(candidateToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(candidateToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    SendInvite = (req, resp) => {
        console.log('send invite called');
        console.log(req.body);
        let emailInfo = {
            to: 'alok_j10@yahoo.co.in',
            subject: 'Tech Test Email',
            text: 'Please confirm the receipt of this email'
        };
        let emailHelper = new EmailHelper();
        emailHelper.SendEmail(emailInfo);
        resp.send('Email Sent');
    }

    Delete = (req, resp) => {
        console.log('get all candidates called');
        resp.send('get all candidates called');
    }

    initializeCollection = () => {
        let candidates = db.getCollection('candidates');
        if(!candidates) {
            candidates = db.addCollection('candidates');
        }
        return candidates;
    }
}

export default new CandidateController();