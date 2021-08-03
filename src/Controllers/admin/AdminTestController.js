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

    GetMy = (req, resp) => {
        console.log('get my tests called', req.user);
        let model = new TestModel();
        model.GetMy(req.user)
            .then((res) => {
                console.log('fetched tests');
                resp.send(res);
            })
            .catch((err) => {
                console.log('error in get my tests', err);
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
    }

    GetTestsAvailableForMe = (req, resp) => {
        console.log('GetTestsAvailableForMe called', req.user);
        let model = new TestModel();
        let grade = '6';
        model.GetTestsAvailableForMe(req.user, grade)
            .then((res) => {
                console.log('fetched tests');
                resp.send(res);
            })
            .catch((err) => {
                console.log('error in get my tests', err);
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });
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
                    selectedMcqIds.push({ mcqId: item.mcqId, questionOrderIndex: item.questionOrderIndex });
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
        let { test_meta } = req.body;
        test_meta.createdOn = (new Date()).toLocaleDateString();
        test_meta.createdBy = req.user.id ? req.user.id : '';
        db.insert(this.entityName, req.body.test_meta);
        resp.status(200).send('success');
    }

    Update = (req, resp) => {
        console.log('update test called');
        console.log(req.body);
        let testModel = new TestModel();
        let newEntity = req.body;
        
        testModel.Update(newEntity).then((entity) => {
            resp.status(200).send(entity);
        }).catch((err) => {
            resp.status(500).send(err);
        });

    }

    UpdateTest = (testId, newEntity, test_link) => {
        console.log(testId);
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
        db.update(this.entityName, newEntity, testId);

    }

    Delete = (req, resp) => {
        console.log('delete test called');
        resp.send('delete test called');
    }

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