import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';
import {
    GetQueryConfig,
    HandlePromise
} from '../commons/RoleDefinitions';
import {
    VIEW_TEST_REGISTRATIONS, VIEW_MY_TEST_REGISTRATIONS,
    VIEW_REGISTRATIONS_FOR_TEST
} from '../../commons/RoleBasedQueries/TestRegistrationQueries';
import TestModel from '../TestModel';

class TestRegistrationModel {
    entityName = 'test_registrations';
    entities = {};

    GetAllMyTestRegistrations = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_MY_TEST_REGISTRATIONS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetRegistrationsForTest = (userEntity, testId) => {
        let queryConfig = GetQueryConfig(VIEW_REGISTRATIONS_FOR_TEST);
        return HandlePromise(db, queryConfig, { userEntity: userEntity, testId: testId });
    }

    GetAllRegistrations = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_TEST_REGISTRATIONS);
        return HandlePromise(db, queryConfig, userEntity);
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
        
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    CreateResponse = async (testId) => {
        let testModel = new TestModel();
        let testEntity = await testModel.GetTestById(userEntity, testId);
        let mcqModel = new McqModel();

        let selectedMcqIds = [];
        testEntity.test_meta.selectedMcqs.map((item, index) => {
            selectedMcqIds.push({ mcqId: item.mcqId, questionOrderIndex: item.questionOrderIndex });
        });
        let isVideoMonitringRequired = testEntity.test_meta &&
            testEntity.test_meta.settings &&
            testEntity.test_meta.settings.videoMonitoringRequired;
        let mcqResponseMeta = {
            testId: testEntity.id,
            duration: testEntity.test_meta.duration,
            videoMonitoringRequired: !!isVideoMonitringRequired,
            mcqs: []
        };
        let mcqs = await mcqModel.GetMcqsByIds(selectedMcqIds);

        testEntity.test_meta.selectedMcqs.map((item, index) => {
            let filteredMcq = mcqs.filter((mcqItem, index) => {
                return mcqItem.id === item.mcqId;
            });
            if (filteredMcq && filteredMcq.length > 0) {
                let mcqItem = filteredMcq[0];
                let choices = [];
                mcqItem.mcq_meta.choices.map((choiceItem) => {
                    choices.push({
                        key: choiceItem.key,
                        content: choiceItem.content
                    })
                })
                // item.mcq = mcqItem;
                item.mcq = {
                    id: mcqItem.id,
                    questionOrderIndex: index,
                    mcq_meta: {
                        description: mcqItem.mcq_meta.description,
                        choices: choices
                    }
                }
                item.candidateResponse = {
                    responseKeys: []
                }
                mcqResponseMeta.mcqs.push(item);
            }
        });

        return mcqResponseMeta;
    }

}
export default TestRegistrationModel;