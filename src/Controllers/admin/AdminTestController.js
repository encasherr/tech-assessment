import db from '../../db';

class AdminTestController {
    GetAll = (req, resp) => {
        console.log('get all tests called', req.user);
        let tests = this.initializeCollection();
        console.log(tests.data.length);
        resp.status(200).json(tests.data);
    }

    GetTest = (req, resp) => {
        let testId = req.query.testId;
        console.log('get test called: ' + testId);
        let tests = this.initializeCollection();
        // let test = tests.findOne({ '$loki': testId });
        let filteredTests = tests.where((item) => {
            console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
            return item['$loki'] == testId;    
        });

        console.log(filteredTests[0]);
        resp.send(filteredTests[0]);
    }

    Add = (req, resp) => {
        console.log('Add Test called');
        let tests = this.initializeCollection();
        let test = tests.insert(req.body);
        db.saveDatabase();
        console.log(test);
        resp.send(test);
    }

    Update = (req, resp) => {
        console.log('update test called');
        console.log(req.body);
        let testId = req.body.$loki;
        let entity = this.UpdateTest(testId, req.body);
        resp.send(entity);
        
        // let filteredTests = tests.where((item) => {
        //     console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
        //     return item['$loki'] == testId;    
        // });
        // console.log(testId);
        // if(filteredTests && filteredTests.length > 0) {
        //     let testToUpdate = filteredTests[0];
        //     let entityToUpdate = this.replaceEntity(testToUpdate, req.body);
        //     tests.update(entityToUpdate);
        //     db.saveDatabase();
        //     resp.send(entityToUpdate);
        // }
        // else {
        //     console.log('nothing to update');
        //     resp.send('nothing to update');
        // }
    }

    UpdateTest = (testId, newEntity, test_link) => {
        let tests = this.initializeCollection();
        let filteredTests = tests.where((item) => {
            console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
            return item['$loki'] == testId;    
        });
        console.log(testId);
        if(filteredTests && filteredTests.length > 0) {
            let testToUpdate = filteredTests[0];
            if(newEntity && newEntity.invitations && newEntity.invitations.length > 0) {
                let invitations = [];
                newEntity.invitations.map((invitation, index) => {
                    let filteredInvitations = invitations.filter((item,id) => {
                        return item.emailTo === invitation.emailTo;
                    });
                    if(filteredInvitations && filteredInvitations.length > 0) {
                    } else {
                        invitation.test_link = test_link;
                        invitations.push(invitation);
                    }
                });
                newEntity.invitations = [];
                newEntity.invitations = invitations;
            }
            let entityToUpdate = this.replaceEntity(testToUpdate, newEntity);
            tests.update(entityToUpdate);
            db.saveDatabase();
            return entityToUpdate;
        }
        else {
            console.log('nothing to update');
            return null;
        }
    }

    Delete = (req, resp) => {
        console.log('delete test called');
        resp.send('delete test called');
    }

    initializeCollection = () => {
        let tests = db.getCollection('tests');
        if(!tests) {
            tests = db.addCollection('tests');
        }
        return tests;
    }

    replaceEntity = (oldEntity, newEntity) => {
        if(oldEntity != null){
            for (var property in newEntity) {
                if (newEntity.hasOwnProperty(property) && property !== "$loki" && property !== 'meta') {
                    oldEntity[property] = newEntity[property];
                }
            }
        }
        return oldEntity;
    }
}

export default new AdminTestController();