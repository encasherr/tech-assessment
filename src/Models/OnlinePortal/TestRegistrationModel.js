import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';
import { GetQueryConfig, 
    HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_TEST_REGISTRATIONS } from '../commons/RoleBasedQueries/TestRegistratioQueries';

class TestRegistrationModel {
    entityName = 'test_registrations';
    entities = {};
    
    GetAllByTestId = (userEntity, testId) => {
        let queryConfig = GetQueryConfig(VIEW_TEST_REGISTRATIONS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity).then((insertId) => {
                resolve(insertId);
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
export default TestRegistrationModel;