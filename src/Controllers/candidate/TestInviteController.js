import db from '../../db';
import AdminTestController from '../admin/AdminTestController';
import Constants from '../../commons/Constants';
import TestModel from '../../TestModel';
import { EmailConfig } from '../../commons/ServerConfig';
import EmailHelper from '../../commons/EmailHelper';

class TestInviteController {

    StartTest = (req, resp) => {
        // let { testId, candidateEmailId } = req.body;
        let candidateEmailId = req.user.emailId;
        let model = new TestModel();
        let testId = 0;
        console.log('req.body', req.body);
        if(req.body.testId) {
            testId = req.body.testId;
        }
        else {
            testId = model.GetTestId(candidateEmailId);
        }
        model.GetTestForSimulator(testId)
                .then((res) => {
                    model.UpdateTestInvite(res, candidateEmailId, Constants.CandidateTestStatus.Started);
                    resp.status(200).json({
                        message: 'success',
                        data: res
                    });
                })
                .catch((err) => {
                    console.log(`Error while loading testId: ${testId} , error: ${err}`);
                    resp.status(404).json({
                        message: err
                    });
                });
    }
    
    SendInvite = (req, resp) => {
        console.log('send invite called');
        console.log(req.body);
        let { invitations, testId, testName } = req.body;
        let test_link = this.generate_test_link(testId);
        AdminTestController.UpdateTest(testId, req.body, test_link);
        if(invitations && invitations.length > 0) {
            let sentEmailIds = [];
            let model = new TestModel();
            invitations.map((inviteInfo, index) => {
                if(!sentEmailIds.includes(inviteInfo.emailTo)) {
                    let emailInfo = {
                        to: inviteInfo.emailTo,
                        subject: inviteInfo.emailSubject,
                        testName: testName,
                        testLink: test_link
                    };
                    let emailHelper = new EmailHelper();
                    emailHelper.SendEmail(emailInfo);
                    sentEmailIds.push(inviteInfo.emailTo);

                    model.UpdateTestInvite(testId, emailInfo.to, Constants.CandidateTestStatus.NotStarted);
                }
            })
        }
        resp.send('Email Sent');
    }

    generate_test_link = (testId) => {
        let link = EmailConfig.testLinkPrefix + testId;
        return link;
    }

    // UpdateTestInvite = (testEntity, candidateEmailId, testStatus) => {
    //     // let tests = this.initializeCollection();
    //     // let testEntity = this.GetTestToInvite(tests, testId);
    //     if(testEntity !== null) {
    //         let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
    //         if(candidateInvite !== null) {
    //             candidateInvite.testStatus = testStatus;
    //             tests.update(testEntity);
    //             db.saveDatabase();
    //             return testEntity;
    //         }
    //     }
    //     return null;
    // }

    // GetCandidateInvite = (testEntity, candidateEmailId) => {
    //     // let tests = this.initializeCollection();
    //     if(testEntity && testEntity.invitations) {
    //         let filteredCandidates = testEntity.invitations.where((item) => {
    //             return item.emailTo == candidateEmailId;    
    //         });
    //         if(filteredCandidates && filteredCandidates.length > 0) {
    //             return filteredCandidates[0];
    //         }
    //     }
    //     return null;
    // }

    // GetTestToInvite = (tests, testId) => {
    //     let filteredTests = tests.where((item) => {
    //         return item['$loki'] == testId;    
    //     });
    //     if(filteredTests && filteredTests.length > 0) {
    //         return filteredTests[0];
    //     }
    //     return null;
    // }

    initializeCollection = () => {
        let tests = db.getCollection('tests');
        if(!tests) {
            tests = db.addCollection('tests');
        }
        return tests;
    }

}

export default new TestInviteController();