import axios from 'axios';
import config from '../config';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from './CategoryActions';

export const ADD_TEST_BEGIN = 'ADD_TEST_BEGIN';
export const ADD_TEST_SUCCESS = 'ADD_TEST_SUCCESS';
export const ADD_TEST_FAIL = 'ADD_TEST_FAIL';
export const TEST_SEARCH_BEGIN = 'TEST_SEARCH_BEGIN';
export const TEST_SEARCH_SUCCESS = 'TEST_SEARCH_SUCCESS';
export const UPDATE_TEST_BEGIN = 'UPDATE_TEST_BEGIN';
export const UPDATE_TEST_SUCCESS = 'UPDATE_TEST_SUCCESS';
export const UPDATE_TEST_FAIL = 'UPDATE_TEST_FAIL';
export const SELECT_TEST = 'SELECT_TEST';
export const CURRENT_TEST_FIELD_CHANGE = 'CURRENT_TEST_FIELD_CHANGE';
export const CURRENT_TEST_FIELD_CHANGE_END = 'CURRENT_TEST_FIELD_CHANGE_END';
export const CURRENT_ANSWER_FIELD_CHANGE = 'CURRENT_ANSWER_FIELD_CHANGE';
export const CURRENT_ANSWER_FIELD_CHANGE_END = 'CURRENT_ANSWER_FIELD_CHANGE_END';
export const CHOICE_ADDED_TO_TEST = 'CHOICE_ADDED_TO_TEST';
export const FETCH_TEST_BEGIN = 'FETCH_TEST_BEGIN';
export const FETCH_TESTS_SUCCESS = 'FETCH_TESTS_SUCCESS';
export const FETCH_TESTS_FAIL = 'FETCH_TESTS_FAIL';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const CurrentTestFieldChange = (val, field, model) => dispatch => {
    console.log('test field change: ' + field);
    console.log(val);
    switch(field)
    {
        case 'testName':
        {
            model.testName = val;
            dispatch({
                type: CURRENT_TEST_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'skill':
        {
            model.skill = val;
            dispatch({
                type: CURRENT_TEST_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'duration':
        {
            model.duration = val;
            dispatch({
                type: CURRENT_TEST_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'experienceYears':
        {
            model.experienceYears = val;
            dispatch({
                type: CURRENT_TEST_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
        }
    }
    dispatch({
        type: CURRENT_TEST_FIELD_CHANGE_END
    });
}

export const CurrentAnswerFieldChange = (val, field, model) => dispatch => {
    console.log('test answer field change: ' + field);
    console.log(val);
    switch(field)
    {
        case 'content':
        {
            model.content = val;
            dispatch({
                type: CURRENT_ANSWER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'isCorrect':
        {
            model.isCorrect = val;
            dispatch({
                type: CURRENT_ANSWER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
        }
    }
    dispatch({
        type: CURRENT_ANSWER_FIELD_CHANGE_END
    });
}

export const AddAnswerChoice = (answerModel, testModel) => dispatch => {
    if(testModel) {
        if(!testModel.choices) {
            testModel.choices = [];
        }
        testModel.choices.push(answerModel);
    }
    dispatch({
        type: CHOICE_ADDED_TO_TEST,
        payload: testModel
    })
}

export const AddTest = (testModel, editMode) => dispatch => {
    dispatch({
        type: ADD_TEST_BEGIN
    });
    let url = config.adminApiUrl + 'test';
    console.log('action model');
    console.log(testModel);
    testModel.status = 'draft';
    axios.post(url, testModel)
        .then((res) => {
            console.log('test saved: ' + res);
            dispatch({
                type: ADD_TEST_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: ADD_TEST_FAIL,
                payload: err
            });
        });
    
}

 export const FetchCategories = () => dispatch => {
    // dispatch({
    //     type: FETCH_CATEGORIES_BEGIN
    // });
    let url = config.adminApiUrl + 'getAllCategories';
    axios.get(url)
        .then((res) => {
            console.log('categories fetched');
            dispatch({
                type: FETCH_CATEGORIES_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CATEGORIES_FAIL,
                payload: err
            });
        });
}

export const FetchSkills = () => dispatch => {
    let url = config.adminApiUrl + 'getAllSkills';
    axios.get(url)
        .then((res) => {
            console.log('skills fetched');
            dispatch({
                type: FETCH_SKILLS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_SKILLS_FAIL,
                payload: err
            });
        });
}

// export const SelectMcq = (testModel) => dispatch => {
//     dispatch({
//         type: SELECT_TEST,
//         payload: testModel
//     })
// }

export const UpdateTest = (testModel) => dispatch => {
    dispatch({
        type: UPDATE_TEST_BEGIN
    });
    let url = config.adminApiUrl + 'test';
    axios.put(url, testModel)
        .then((res) => {
            dispatch({
                type: UPDATE_TEST_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_TEST_FAIL,
                payload: err
            });
        });
}

export const FetchTests = () => dispatch => {
    dispatch({
        type: FETCH_TEST_BEGIN
    });
    let url = config.adminApiUrl + 'getAllTests';
    axios.get(url)
        .then((res) => {
            console.log('TEST fetched');
            dispatch({
                type: FETCH_TESTS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_TESTS_FAIL,
                payload: err
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
