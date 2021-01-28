// import db from '../../db';
import db from '../../db/mysqldb';
import BaseController from '../BaseController';
import TestModel from '../../Models/TestModel';
import InvitationModel from '../../Models/InvitationModel';
import McqModel from '../../Models/McqModel';

class AdminTestController extends BaseController {
    entityName = 'tests';
    tests = {};
    
    GetAll = (req, resp) => {
        console.log('get all tests called', req.user);
        let model = new TestModel();
        model.GetAll(req.user)
        // this.initializeCollection()
            .then((res) => {
                console.log('fetched tests');
                resp.send(res);
            })
            .catch((err) => {
                console.log('error in get all tests', err);
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });
    }

    GetTest = (req, resp) => {
        let testId = req.query.testId;
        console.log('get test called: ' + testId);
        
        let testModel = new TestModel();
        testModel.GetTestById(req.user, testId).then((testEntity) => {
            resp.status(200).send(testEntity);
        })
        .catch((err) => {
            console.log('error in get mcqs by test id');
            console.log(err);
            resp.status(500).send(err);
        })
        // db.findOne(this.entityName, testId).then((data) => {
        //     resp.status(200).send(data);
        // }).catch((err) => {
        //     resp.status(500).send(err);
        // })
        
    }

    GetMcqsByTestId = (req, resp) => {
        let testId = req.query.testId;
        console.log('get mcqs by testid called: ', testId);

        let testModel = new TestModel();
        testModel.GetTest(testId).then((testEntity) => {
            if(!testEntity.test_meta.selectedMcqs) {
                resp.status(200).send([]);
            }
            else {
                let selectedMcqIds = [];
                testEntity.test_meta.selectedMcqs.map((item, index) => {
                    selectedMcqIds.push(item.mcqId);
                });
                let mcqModel = new McqModel();
                mcqModel.GetMcqsByIds(selectedMcqIds).then((mcqs) => {
                    resp.status(200).send(mcqs);
                }).catch((err) => {
                    console.log('error in get mcqs by test id');
                    console.log(err);
                    resp.status(500).send(err);
                })
            }
        });
    }

    GetCandidatesByTestId = (req, resp) => {
        let testId = req.query.testId;
        console.log('get candidates by testid called: ', testId);

        let testModel = new TestModel();
        testModel.GetCandidatesByTestId(testId).then((candidates) => {
            if(!candidates) {
                console.log('no candidates found');
                resp.status(200).send([]);
            }
            else {
                console.log('candidates found: ', candidates.length);
                resp.status(200).send(candidates);
            }
        });
    }

    Add = (req, resp) => {
        console.log('Add Test called');
        console.log(req.body);
        // let tests = this.initializeCollection();
        // let test = tests.insert(req.body);
        // db.saveDatabase(() => {
        //     this.EmailSnapshot('CategoryAdd');
        // });

        let { test_meta } = req.body;
        test_meta.createdOn = (new Date()).toLocaleDateString();
        test_meta.createdBy = req.user.id ? req.user.id : '';
        db.insert(this.entityName, req.body.test_meta);
        resp.status(200).send('success');
        // console.log(test);
        // resp.send(test);
    }

    Update = (req, resp) => {
        console.log('update test called');
        console.log(req.body);
        // let testId = req.body.id;
        // let testId = req.body.$loki;
        // let entity = this.UpdateTest(testId, req.body.test_meta);
        let testModel = new TestModel();
        let newEntity = req.body;
        
        testModel.Update(newEntity).then((entity) => {
            resp.status(200).send(entity);
        }).catch((err) => {
            resp.status(500).send(err);
        });

        
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
        // let tests = this.initializeCollection();
        // let filteredTests = tests.where((item) => {
        //     console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
        //     return item['$loki'] == testId;    
        // });
        console.log(testId);
        // if(filteredTests && filteredTests.length > 0) {
        //     let testToUpdate = filteredTests[0];
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
            // let entityToUpdate = this.replaceEntity(testToUpdate, newEntity);
            // tests.update(entityToUpdate);
            // db.saveDatabase(() => {
            //     this.EmailSnapshot('CategoryAdd');
            // });
            db.update(this.entityName, newEntity, testId);
    
            // return entityToUpdate;
        // }
        // else {
        //     console.log('nothing to update');
        //     return null;
        // }
    }

    Delete = (req, resp) => {
        console.log('delete test called');
        resp.send('delete test called');
    }

    // initializeCollection = () => {
    //     let tests = db.getCollection('tests');
    //     if(!tests) {
    //         tests = db.addCollection('tests');
    //     }
    //     return tests;
    // }

    initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    this.tests = res;
                    resolve(this.tests);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
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