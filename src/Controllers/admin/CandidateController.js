import db from '../../db';
import EmailHelper from '../../commons/EmailHelper';
import { EmailConfig } from '../../commons/ServerConfig';
import AdminTestController from './AdminTestController';

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

    Delete = (req, resp) => {
        console.log('get all candidates called');
        resp.send('get all candidates called');
    }

    // SendInvite = (req, resp) => {
    //     console.log('send invite called');
    //     console.log(req.body);
    //     let { invitations, testId, testName } = req.body;
    //     let test_link = this.generate_test_link(testId);
    //     AdminTestController.UpdateTest(testId, req.body, test_link);
    //     if(invitations && invitations.length > 0) {
    //         let sentEmailIds = [];
    //         invitations.map((inviteInfo, index) => {
    //             if(!sentEmailIds.includes(inviteInfo.emailTo)) {
    //                 let emailInfo = {
    //                     to: inviteInfo.emailTo,
    //                     subject: inviteInfo.emailSubject,
    //                     testName: testName,
    //                     testLink: test_link
    //                 };
    //                 let emailHelper = new EmailHelper();
    //                 emailHelper.SendEmail(emailInfo);
    //                 sentEmailIds.push(inviteInfo.emailTo);
    //             }
    //         })
    //     }
    //     resp.send('Email Sent');
    // }

    // generate_test_link = (testId) => {
    //     let link = EmailConfig.testLinkPrefix + testId;
    //     return link;
    // }

    initializeCollection = () => {
        let candidates = db.getCollection('candidates');
        if(!candidates) {
            candidates = db.addCollection('candidates');
        }
        return candidates;
    }
}

export default new CandidateController();