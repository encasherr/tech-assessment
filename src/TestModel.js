import db from './db';
import users from './users';

class TestModel {
    entities = {};
    
    constructor() {
      this.initializeCollection();
    }

    GetTestId = (candidateEmailId) => {

    }

    GetTestForSimulator = (testId) => {
        return new Promise((resolve, reject) => {
            let tests = this.entities.find({ '$loki': testId });
            console.log(`tests filtered for id: ${testId}, ${tests.length}`);
            if(tests && tests.length > 0) {
                resolve(tests[0]);
            }
            reject("No Test Found");
        })

    }

    UpdateTestInvite = (testEntity, candidateEmailId, testStatus) => {
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

    UpdateTestInvite = (testId, candidateEmailId, testStatus) => {
        let tests = this.entities.find({ '$loki': testId });
        console.log(`tests filtered for id: ${testId}, ${tests.length}`);
        let testEntity = null;
        if(tests && tests.length > 0) {
            testEntity = tests[0];
        }
        if(testEntity !== null) {
            let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
            if(candidateInvite !== null) {
                candidateInvite.testStatus = testStatus;
                // tests.update(testEntity);
                this.entities.update(testEntity);
                db.saveDatabase();
                return testEntity;
            }
        }
        return null;
    }
    
    GetCandidateInvite = (testEntity, candidateEmailId) => {
        if(testEntity && testEntity.invitations && testEntity.invitations.length > 0) {
            // let filteredCandidates = testEntity.invitations.where((item) => {
            //     return item.emailTo == candidateEmailId;    
            // });
            let filteredCandidates = testEntity.invitations.filter((item) => {
                return item.emailTo === candidateEmailId;
            })
            console.log(`candidates filtered for emailid: ${candidateEmailId}, ${filteredCandidates.length}`);
            if(filteredCandidates && filteredCandidates.length > 0) {
                return filteredCandidates[0];
            }
        }
        return null;
    }
    
    initializeCollection = () => {
        this.entities = db.getCollection('tests');
        if(!this.entities) {
            this.entities = db.addCollection('tests');
        }
        console.log('tests entity initialized', this.entities.data.length);
    }
}
export default TestModel;