import db from '../../db';
import Constants from '../../commons/Constants';

class TestInviteController {

    StartTest = (req, resp) => {
        let { testId, candidateEmailId } = req.body;
        let test = this.UpdateTestInvite(testId, candidateEmailId, Constants.CandidateTestStatus.Started);
        resp.status(200).json({
            message: 'success'
        });
    }

    UpdateTestInvite = (testId, candidateEmailId, testStatus) => {
        let tests = this.initializeCollection();
        let testEntity = this.GetTestToInvite(tests, testId);
        if(testEntity !== null) {
            let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
            if(candidateInvite !== null) {
                candidateInvite.testStatus = testStatus;
                tests.update(testEntity);
                db.saveDatabase();
                return testEntity;
            }
        }
        return null;
    }

    GetCandidateInvite = (testEntity, candidateEmailId) => {
        let tests = this.initializeCollection();
        let filteredCandidates = testEntity.invitations.where((item) => {
            return item.emailTo == candidateEmailId;    
        });
        if(filteredCandidates && filteredCandidates.length > 0) {
            return filteredCandidates[0];
        }
        return null;
    }

    GetTestToInvite = (tests, testId) => {
        let filteredTests = tests.where((item) => {
            return item['$loki'] == testId;    
        });
        if(filteredTests && filteredTests.length > 0) {
            return filteredTests[0];
        }
        return null;
    }

    initializeCollection = () => {
        let tests = db.getCollection('tests');
        if(!tests) {
            tests = db.addCollection('tests');
        }
        return tests;
    }

}

export default new TestInviteController();