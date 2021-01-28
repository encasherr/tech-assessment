import config from '../config';
import repository from '../repository';

export const ADD_QUESTION_TO_TEST = 'ADD_QUESTION_TO_TEST';
export const REMOVE_QUESTION_FROM_TEST = 'REMOVE_QUESTION_FROM_TEST';
export const PUBLISH_TEST_SUCCESS = 'PUBLISH_TEST_SUCCESS';
export const PUBLISH_TEST_FAIL = 'PUBLISH_TEST_FAIL';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_TEST_FAIL = 'FETCH_TEST_FAIL';
export const FETCH_TEST_MCQS_SUCCESS = 'FETCH_TEST_MCQS_SUCCESS';
export const FETCH_TEST_MCQS_FAIL = 'FETCH_TEST_MCQS_FAIL';
export const FETCH_TEST_CANDIDATES_SUCCESS = 'FETCH_TEST_CANDIDATES_SUCCESS';
export const FETCH_TEST_CANDIDATES_FAIL = 'FETCH_TEST_CANDIDATES_FAIL';
export const TEST_PUBLISHED = 'TEST_PUBLISHED';
export const TEST_SETTINGS_FIELD_CHANGE = 'TEST_SETTINGS_FIELD_CHANGE';
export const TEST_SETTINGS_UPDATE_SUCCESS = 'TEST_SETTINGS_UPDATE_SUCCESS';
export const TEST_SETTINGS_UPDATE_FAIL = 'TEST_SETTINGS_UPDATE_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

var history = {};
export const SetHistory = (propsHistory) => dispatch => {
    history = propsHistory;
}

export const SettingsFieldChange = (val, field, model) => dispatch => {
    if(model && model.test_meta){
        if(!model.test_meta.settings) {
            model.test_meta.settings = {};
        }
    }
    switch(field)
    {
        case 'emailSubject':
        {
            model.test_meta.settings.emailSubject = val;
            dispatch({
                type: TEST_SETTINGS_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'testVisibility':
        {
            model.test_meta.settings.testVisibility = val;
            dispatch({
                type: TEST_SETTINGS_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
            break;
        }
    }
}

export const FetchTest = (testId) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'getTest' + '?testId=' + testId;
    repository.getData(url, history)
        .then((res) => {
            dispatch({
                type: FETCH_TEST_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_TEST_FAIL,
                payload: err
            });
        });
}

export const LoadTestMcqs = (testId) => dispatch => {
    let url = config.instance.getAdminApiUrl() + `getMcqsByTestId?testId=${testId}`;
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_TEST_MCQS_SUCCESS,
                payload: res.data
            });
        }).catch((err) => {
            dispatch({
                type: FETCH_TEST_MCQS_FAIL,
                payload: err
            })
        });
}

export const LoadTestCandidates = (testId) => dispatch => {
    let url = config.instance.getAdminApiUrl() + `getCandidatesByTestId?testId=${testId}`;
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_TEST_CANDIDATES_SUCCESS,
                payload: res.data
            });
        }).catch((err) => {
            dispatch({
                type: FETCH_TEST_CANDIDATES_FAIL,
                payload: err
            })
        });
}

export const AddMcqToTest = (mcqItem, testModel) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getAdminApiUrl() + 'test';

        if (!testModel.test_meta.selectedMcqs) {
            testModel.test_meta.selectedMcqs = [];
        }
        let mcqList = testModel.test_meta.selectedMcqs;
        let filterIndex = testModel.test_meta.selectedMcqs.findIndex(item => item.id === mcqItem.id);
        if (filterIndex !== undefined && filterIndex > -1) {
            return;
        }
        else {
            testModel.test_meta.selectedMcqs.push({
                mcqId: mcqItem.id
            });
        }
        repository.updateData(url, testModel, history)
            .then((res) => {
                dispatch({
                    type: ADD_QUESTION_TO_TEST,
                    payload: res.data
                });
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });

    })
}

export const RemoveMcqFromTest = (mcqItem, testModel) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getAdminApiUrl() + 'test';

        if (!testModel.test_meta.selectedMcqs) {
            testModel.test_meta.selectedMcqs = [];
        }
        let mcqList = testModel.test_meta.selectedMcqs;
        let filterIndex = testModel.test_meta.selectedMcqs.findIndex(item => {
            return item.mcqId === mcqItem.id
        });
        if (filterIndex !== undefined && filterIndex > -1) {
            console.log(`removed item: ${mcqItem.id}`);
            testModel.test_meta.selectedMcqs.splice(filterIndex, 1);
        }
        else {
            console.log(`could not find item to remove: ${mcqItem.id}`);
            return;
        }
        repository.updateData(url, testModel, history)
            .then((res) => {
                dispatch({
                    type: REMOVE_QUESTION_FROM_TEST,
                    payload: res.data
                });
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                console.log('error in removing mcq from test', err);
                reject(err);
            });
    });
}

export const PublishTest = (testModel) => dispatch => {

    let url = config.instance.getAdminApiUrl() + 'test';
    testModel.test_meta.status = 'published';
    repository.updateData(url, testModel, history)
        .then((res) => {
            dispatch({
                type: TEST_PUBLISHED,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: PUBLISH_TEST_FAIL,
                payload: err
            });
        });

}

export const UpdateTestSettings = (testModel) => dispatch => {
    return new Promise((resolve, reject) => {

    let url = config.instance.getAdminApiUrl() + 'test';
    repository.updateData(url, testModel, history)
        .then((res) => {
            dispatch({
                type: TEST_SETTINGS_UPDATE_SUCCESS,
                payload: res.data
            });
            resolve(true);
        })
        .catch((err) => {
            dispatch({
                type: TEST_SETTINGS_UPDATE_SUCCESS,
                payload: err
            });
            reject(err);
        });
    });

}

export const CloseSnackbar = () => dispatch => {
    dispatch({
        type: CLOSE_SNACKBAR
    });
}
export const OpenSnackbar = () => dispatch => {
    dispatch({
        type: OPEN_SNACKBAR
    });
}
