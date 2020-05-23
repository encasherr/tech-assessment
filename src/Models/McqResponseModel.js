// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

class McqResponseModel {
    entityName = 'mcqresponses';
    entities = {};
    
    // constructor() {
    //   this.initializeCollection();
    // }

    GetAll = (userEntity) => {
        console.log('user caller', userEntity);
        return new Promise((resolve, reject) => {
            this.initializeCollection().then((res) => {
                if(userEntity && userEntity.role === users.UserRoles.admin) {
                    console.log(this.entities.data.length);
                    resolve(this.entities.data);
                }
                else {
                    resolve(this.GetInvitationsByUser(userEntity));
                }
            });
        })
    }

    GetMcqResponse = (responseId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, responseId).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    GetInvitation = (invitationId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, invitationId).then((res) => {
                resolve(res);
            });
        })
    }

    GetByInvitationId = (invitationId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getMcqResponseByInvitationId(invitationId);
            db.executeQuery(sql).then((res) => {
                let data = db.serializeToJson(res, this.entityName);
                resolve(data[0]);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity).then((insertId) => {
                resolve(insertId);
            });
        });
    }

    Update = (entity) => {
        entity.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.response_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    /*UpdateTestInvite = (testEntity, candidateEmailId, testStatus) => {
        if(testEntity !== null) {
            let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
            if(candidateInvite !== null) {
                candidateInvite.testStatus = testStatus;
                tests.update(testEntity);
                db.saveDatabase(() => {
                    this.EmailSnapshot('CategoryAdd');
                });
        
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
    }*/

    initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    this.entities = res;
                    resolve(this.entities);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
    }
}
export default McqResponseModel;