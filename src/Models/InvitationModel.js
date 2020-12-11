// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';
import { GetQueryConfig, 
    HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_INVITATIONS } from '../commons/RoleBasedQueries/InvitationQueries';

class InvitationModel {
    entityName = 'invitations';
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

    GetInvitationsByUser = (userEntity) => {
        if(this.entities.data && this.entities.data.length > 0 && userEntity) {
            let filteredInvitations = this.entities.data.filter((item, index) => {
                return item.invitation_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredInvitations.length);
            return filteredInvitations;
        }
        return [];
    }

    GetAllInvitations = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_INVITATIONS);
        return HandlePromise(db, queryConfig, userEntity);
    
    /*    return new Promise((resolve, reject) => {
            let sql = queries.getAllInvitationsQuery();
            db.executeQuery(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })*/
    }

    GetInvitation = (invitationId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, invitationId).then((res) => {
                resolve(res);
            });
        })
    }

    GetCandidateInfoByInvitationId = (invitationId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getCandidateInfoByInvitationId(invitationId);
            db.executeQuery(sql).then((res) => {
                resolve(res[0]);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    Add = (entity) => {
        entity.status = "INITIATED";
        entity.invitedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity)
                .then((insertId) => {
                    resolve(insertId);
                });
        });
    }

    Update = (entity) => {
        entity.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.invitation_meta, entity.id).then((res) => {
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
export default InvitationModel;