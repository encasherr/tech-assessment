import db from '../db/mysqldb';
import queries from '../db/queries';

import { GetQueryConfig, 
    HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_TESTS } from '../commons/RoleBasedQueries/TestQueries';

class TestModel {
    entityName = 'tests';
    entities = {};
    
    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_TESTS);
        return HandlePromise(db, queryConfig, userEntity);

        /*return new Promise((resolve, reject) => {
            this.initializeCollection().then((res) => {
                if(userEntity && userEntity.role === users.UserRoles.admin) {
                    console.log(this.entities.data.length);
                    resolve(this.entities.data);
                }
                else {
                    resolve(this.GetTestsByUser(userEntity));
                }
            });
        })*/
    }

    /*GetTestsByUser = (userEntity) => {
        if(this.entities.data && this.entities.data.length > 0 && userEntity) {
            let filteredTests = this.entities.data.filter((item, index) => {
                return item.test_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredTests.length);
            return filteredTests;
        }
        return [];
    }*/

    GetTest = (testId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, testId)
            .then((res) => {
                resolve(res);
            });
        })
    }

    serializeToJson = (data) => {
        console.log('test data', data);
        let test_meta = data['test_meta'];
        // test_meta = test_meta.replace(/\n/g, "\\n");
        // test_meta = test_meta.replace(/\r/g, "\\r");
        // test_meta = test_meta.replace(/\t/g, "\\t");
        let output = {};
        output.id = data.id;
        output['test_meta'] = JSON.parse(test_meta);
        return output;
        // output['user_meta'] = JSON.parse(data['user_meta']);
       /* let outputArray = [];
        console.log('data count', data.length);
        if(data && data.length > 0) {
            data.map((item, index) => {

                let test_meta = item['test_meta'];
                test_meta = test_meta.replace(/\n/g, "\\n");
                test_meta = test_meta.replace(/\r/g, "\\r");
                test_meta = test_meta.replace(/\t/g, "\\t");
                let output = {};
                output.id = item.id;
                output['test_meta'] = JSON.parse(test_meta);
                output['user_meta'] = JSON.parse(item['user_meta']);
                outputArray.push(output);
            })
        }
        return outputArray;*/
    }

    GetCandidatesByTestId = (testId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getCandidatesByTestId(testId);
            db.executeQuery(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    Add = (entity) => {
        entity.status = "DRAFT";
        entity.addedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity);
            resolve(true);
        });
    }

    Update = (entity) => {
        entity.test_meta.updatedOn = (new Date()).toLocaleDateString();
        if(entity.test_meta.selectedMcqs && entity.test_meta.selectedMcqs.length > 0) {
            entity.test_meta.selectedMcqs.map((item, index) => {
                item.questionOrderIndex = index;
            })
        }
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.test_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

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
export default TestModel;