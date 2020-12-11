import db from '../db/mysqldb';
import users from '../users';
import { GetQueryConfig, 
         HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_ORGS } from '../commons/RoleBasedQueries/OrgQueries';

class OrgModel {
    entityName = 'org';
    entities = {};
    
    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_ORGS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetCandidate = (candidateId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, candidateId).then((res) => {
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

    Update = (entity) => {
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.org_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

}
export default OrgModel;