import db from '../../db/mysqldb';
import users from '../../users';
import { GetQueryConfig, 
         HandlePromise } from '../../commons/RoleDefinitions';
import { VIEW_GRADES } from '../../commons/RoleBasedQueries/GradeQueries';

class GradeModel {
    entityName = 'grade';
    entities = {};
    
    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_GRADES);
        return HandlePromise(db, queryConfig, userEntity);
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
            db.update(this.entityName, entity.grade_meta, entity.id).then((res) => {
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


    // GetCandidate = (candidateId) => {
    //     return new Promise((resolve, reject) => {
    //         db.findOne(this.entityName, candidateId).then((res) => {
    //             resolve(res);
    //         });
    //     })
    // }

}
export default GradeModel;