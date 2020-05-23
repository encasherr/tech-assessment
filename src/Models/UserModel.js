// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

import { GetQueryConfig, 
    HandlePromise,    
    VIEW_USERS } from '../commons/RoleDefinitions';

class UserModel {
    entityName = 'users';
    entities = {};
    
    
    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_USERS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetUser = (userId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, userId).then((res) => {
                resolve(res);
            });
        })
    }

    GetUserByEmail = (emailId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getUserByEmailIdQuery(emailId);
            db.executeQuery(sql).then((res) => {
                resolve(res);
            });
        })
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity).then((insertId) => {
                resolve(insertId);
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    Update = (entity) => {
        entity.user_meta.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.user_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id);
            resolve(entity.user_meta);
        });
    }

    /*initializeCollection = () => {
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
    }*/
}
export default UserModel;