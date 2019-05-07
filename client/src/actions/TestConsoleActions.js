import axios from 'axios';
import config from '../config';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from './CategoryActions';

export const ADD_QUESTION_TO_TEST = 'ADD_QUESTION_TO_TEST';
// export const ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS';
// export const ADD_QUESTION_FAIL = 'ADD_QUESTION_FAIL';
// export const TEST_SEARCH_BEGIN = 'TEST_SEARCH_BEGIN';
// export const TEST_SEARCH_SUCCESS = 'TEST_SEARCH_SUCCESS';
// export const UPDATE_QUESTION_BEGIN = 'UPDATE_QUESTION_BEGIN';
// export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
// export const UPDATE_QUESTION_FAIL = 'UPDATE_QUESTION_FAIL';
// export const SELECT_TEST = 'SELECT_TEST';
// export const CURRENT_QUESTION_FIELD_CHANGE = 'CURRENT_QUESTION_FIELD_CHANGE';
// export const CURRENT_QUESTION_FIELD_CHANGE_END = 'CURRENT_QUESTION_FIELD_CHANGE_END';
// export const CURRENT_ANSWER_FIELD_CHANGE = 'CURRENT_ANSWER_FIELD_CHANGE';
// export const CURRENT_ANSWER_FIELD_CHANGE_END = 'CURRENT_ANSWER_FIELD_CHANGE_END';
// export const CHOICE_ADDED_TO_TEST = 'CHOICE_ADDED_TO_TEST';
// export const FETCH_QUESTION_BEGIN = 'FETCH_QUESTION_BEGIN';
// export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
// export const FETCH_QUESTION_FAIL = 'FETCH_QUESTION_FAIL';
export const PUBLISH_TEST_SUCCESS = 'PUBLISH_TEST_SUCCESS';
export const PUBLISH_TEST_FAIL = 'PUBLISH_TEST_FAIL';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_TEST_FAIL = 'FETCH_TEST_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const FetchTest = (testId) => dispatch => {
    console.log('fetch test: ' + testId);
    let url = config.adminApiUrl + 'getTest' + '?testId=' + testId;
    axios.get(url)
        .then((res) => {
            console.log('test fetched: ');
            console.log(res);
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

export const AddMcqToTest = (mcqItem, testModel) => dispatch => {
    let url = config.adminApiUrl + 'test';
    
    if(!testModel.selectedMcqs){
        testModel.selectedMcqs = [];
    }
    let mcqList = testModel.selectedMcqs;
    let filterIndex = testModel.selectedMcqs.findIndex(item => item.$loki === mcqItem.$loki);
    if(filterIndex !== undefined && filterIndex > -1) {
        testModel.selectedMcqs.splice(filterIndex, 1);
        // mcqToAdd.selected = false;
    }
    else {
        // mcqToAdd.selected = true;
        testModel.selectedMcqs.push(mcqItem);
    }
    axios.put(url, testModel)
        .then((res) => {
            console.log('test updated');
            console.log(res);
            dispatch({
                type: ADD_QUESTION_TO_TEST,
                payload: res.data
            });
        })
        .catch((err) => {

        })
    
}

export const PublishTest = (testModel) => dispatch => {
    
    let url = config.adminApiUrl + 'test';
    console.log('action model');
    console.log(testModel);
    testModel.status = 'published';
    axios.put(url, testModel)
        .then((res) => {
            console.log('test published: ' + res);
            dispatch({
                type: ADD_QUESTION_TO_TEST,
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
