import axios from 'axios';
import config from '../config';
import repository from '../repository';

export const SEND_TEST_INVITE = 'SEND_TEST_INVITE';
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
export const SEND_TEST_INVITE_SUCCESS = 'SEND_TEST_INVITE_SUCCESS';
export const SEND_TEST_INVITE_FAIL = 'SEND_TEST_INVITE_FAIL';
export const INVITE_INFO_FIELD_CHANGE = 'INVITE_INFO_FIELD_CHANGE';

export const SendInvite = (testModel, inviteInfo) => dispatch => {
    let url = config.candidateApiUrl + 'sendInvite';
    
    if(!testModel.invitations){
        testModel.invitations = [];
    }
    testModel.invitations.push(inviteInfo);
    console.log('testmodel invite sent', testModel);
    repository.saveData(url, testModel)
        .then((res) => {
            console.log('invitation sent');
            console.log(res);
            dispatch({
                type: SEND_TEST_INVITE_SUCCESS,
                // payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SEND_TEST_INVITE_FAIL,
                // payload: err
            });
        });
    
}
export const InviteInfoFieldChange = (val, field, model) => dispatch => {
    switch(field)
    {
        case 'emailTo':
        {
            model.emailTo = val;
            dispatch({
                type: INVITE_INFO_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'emailSubject':
        {
            model.emailSubject = val;
            dispatch({
                type: INVITE_INFO_FIELD_CHANGE,
                payload: model
            });
            break;
        }
    }
}