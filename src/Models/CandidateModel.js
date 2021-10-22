// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

class CandidateModel {
    entityName = 'candidates';
    entities = {};
    
    GetAll = (userEntity) => {
        return new Promise((resolve, reject) => {
            this.initializeCollection().then((res) => {
                if(userEntity && userEntity.role === users.UserRoles.admin) {
                    console.log(this.entities.data.length);
                    resolve(this.entities.data);
                }
                else {
                    resolve(this.GetCandidatesByUser(userEntity));
                }
            });
        })
    }

    GetCandidatesByUser = (userEntity) => {
        if(this.entities.data && this.entities.data.length > 0 && userEntity) {
            let filteredCandidates = this.entities.data.filter((item, index) => {
                return item.candidate_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredCandidates.length);
            return filteredCandidates;
        }
        return [];
    }

    GetCandidate = (candidateId) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT *
            FROM ta_candidates
            WHERE id = ${candidateId}
            `;
            db.executeQuery(sql)
                .then((res) => {
                    if(res && res.length > 0) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
            // db.findOne(this.entityName, candidateId).then((res) => {
            //     resolve(res);
            // });
        })
    }
    
    GetCandidateByEmail = (emailId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getCandidateByEmailQuery(emailId);
            db.executeQuery(sql).then((res) => {
                resolve(res);
            });
        })
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity).then((insertId) => {
                resolve(insertId);
            });
        });
    }

    AddCandidate = (entity) => {
        return new Promise((resolve, reject) => {
            db.insertCustom(this.entityName, entity).then((insertId) => {
                resolve(insertId);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    Update = (entity) => {
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.candidate_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    // initializeCollection = () => {
    //     this.entities = db.getCollection('tests');
    //     if(!this.entities) {
    //         this.entities = db.addCollection('tests');
    //     }
    //     console.log('tests entity initialized', this.entities.data.length);
    // }
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
export default CandidateModel;