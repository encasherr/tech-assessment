import db from '../../db/mysqldb';
import {
    GetQueryConfig,
    HandlePromise,
    HandlePromiseWithParams
} from '../../commons/RoleDefinitions';
import {
    VIEW_STUDENTS, VIEW_STUDENT_BY_ID
} from '../../commons/RoleBasedQueries/StudentQueries';

class StudentModel {
    entityName = 'students';
    entities = {};

    GetAllStudents = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_STUDENTS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetStudentById = (userEntity, studentId) => {
        let queryConfig = GetQueryConfig(VIEW_STUDENT_BY_ID);
        return HandlePromiseWithParams(db, queryConfig, { userEntity, studentId });
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insertCustom(this.entityName, entity)
                .then((insertId) => {
                    resolve(insertId);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    Update = (entity) => {
        return new Promise((resolve, reject) => {
            db.updateCustom(this.entityName, entity, entity.id)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        }); 
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

}
export default StudentModel;