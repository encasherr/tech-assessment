import axios from 'axios';
import config from '../config';
import repository from '../repository';

export const ADD_QUESTION_TO_TEST = 'ADD_QUESTION_TO_TEST';
export const PUBLISH_TEST_SUCCESS = 'PUBLISH_TEST_SUCCESS';
export const PUBLISH_TEST_FAIL = 'PUBLISH_TEST_FAIL';
export const FETCH_TEST_SUCCESS = 'FETCH_TEST_SUCCESS';
export const FETCH_TEST_FAIL = 'FETCH_TEST_FAIL';
export const TEST_PUBLISHED = 'TEST_PUBLISHED';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

var history = {};
export const SetHistory = (propsHistory) => dispatch => {
    history = propsHistory;
}

export const FetchTest = (testId) => dispatch => {
    console.log('fetch test: ' + testId);
    let url = config.adminApiUrl + 'getTest' + '?testId=' + testId;
    repository.getData(url, history)
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
    }
    else {
        testModel.selectedMcqs.push(mcqItem);
    }
    repository.updateData(url, testModel, history)
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
    repository.updateData(url, testModel, history)
        .then((res) => {
            console.log('test published');
            console.log(res);
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
