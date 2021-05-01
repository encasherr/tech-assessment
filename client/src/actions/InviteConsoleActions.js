import axios from 'axios';
import config from '../config';
import repository from '../repository';
import { LogoutCurrentUser } from './UserActions';

export const SEND_TEST_INVITE = 'SEND_TEST_INVITE';
export const FETCH_INVITES_BEGIN = 'FETCH_INVITES_BEGIN';
export const FETCH_INVITES_SUCCESS = 'FETCH_INVITES_SUCCESS';
export const FETCH_INVITES_FAIL = 'FETCH_INVITES_FAIL';
export const SEND_TEST_INVITE_SUCCESS = 'SEND_TEST_INVITE_SUCCESS';
export const SEND_TEST_INVITE_FAIL = 'SEND_TEST_INVITE_FAIL';
export const INVITE_INFO_FIELD_CHANGE = 'INVITE_INFO_FIELD_CHANGE';
export const EVALUATION_SUCCESS = 'EVALUATION_SUCCESS';
export const EVALUATION_FAILED = 'EVALUATION_FAILED';

export const FetchInvitations = () => dispatch => {
    dispatch({
        type: FETCH_INVITES_BEGIN
    });
    let url = config.instance.getCandidateApiUrl() + 'getAllInvites';

    repository.getData(url)
        .then((res) => {
            console.log('Invites fetched');

            dispatch({
                type: FETCH_INVITES_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            if(err.data && err.data.message === 'Invalid token.') {
                dispatch(LogoutCurrentUser());
            }
            else {
                dispatch({
                    type: FETCH_INVITES_FAIL,
                    payload: err
                });
            }
        });
}

export const EvaluateResults = (responseId) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getCandidateApiUrl() + 'evaluateAnswers';

        repository.saveData(url, { responseId: responseId})
                    .then((res) => {
                        dispatch({
                            type: EVALUATION_SUCCESS,
                            payload: res.data
                        });
                    }).catch((err) => {
                        dispatch({
                            type: EVALUATION_FAILED,
                            payload: err
                        });
                    });
    })
}

// export const SendInvite = (testModel, inviteInfo) => dispatch => {
export const SendInvite = (model) => dispatch => {
    let url = config.instance.getCandidateApiUrl() + 'sendInvite';
    
    // let model = {
    //     invitation_meta: {
    //         ...inviteInfo,
    //         testId: testModel.id
    //     }
    // }
    
    // let model = {
    //     testId: testModel.id,
    //     emailSubject: inviteInfo.emailSubject,
    //     invitations: [
    //         {
    //             invitation_meta: {
    //                 name: inviteInfo.name,
    //                 testId: testModel.id
    //             }
    //         }
    //     ]
    // }

    return new Promise((resolve, reject) => {
        repository.saveData(url, model)
        .then((res) => {
            dispatch({
                type: SEND_TEST_INVITE_SUCCESS,
                payload: res.data
            });
            resolve(true);
        })
        .catch((err) => {
            dispatch({
                type: SEND_TEST_INVITE_FAIL,
            });
            reject(err);
        });
    });
}

export const InviteInfoFieldChange = (val, field, model) => dispatch => {
    if(!model) {
        model = {};
    }
    switch(field)
    {
        case 'name':
        {
            model.name = val;
            dispatch({
                type: INVITE_INFO_FIELD_CHANGE,
                payload: model
            });
            break;
        }
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