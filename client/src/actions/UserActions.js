import axios from 'axios';
import config from '../config';
import repository from '../repository';
import { FETCH_SKILLS_BEGIN, FETCH_SKILLS_FAIL, FETCH_SKILLS_SUCCESS } from './SkillActions';
import AuthHelper from '../AuthHelper';

export const ADD_USER_BEGIN = 'ADD_USER_BEGIN';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';
export const USER_SEARCH_BEGIN = 'USER_SEARCH_BEGIN';
export const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const SELECT_USER = 'SELECT_USER';
export const CURRENT_USER_FIELD_CHANGE = 'CURRENT_USER_FIELD_CHANGE';
export const CURRENT_USER_FIELD_CHANGE_END = 'CURRENT_USER_FIELD_CHANGE_END';
export const CURRENT_ANSWER_FIELD_CHANGE = 'CURRENT_ANSWER_FIELD_CHANGE';
export const CURRENT_ANSWER_FIELD_CHANGE_END = 'CURRENT_ANSWER_FIELD_CHANGE_END';
export const CHOICE_ADDED_TO_USER = 'CHOICE_ADDED_TO_USER';
export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
export const SET_USER_INFO_LOCAL = 'SET_USER_INFO_LOCAL';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';


var history = {};
export const SetHistory = (propsHistory) => dispatch => {
    history = propsHistory;
}

export const CurrentUserFieldChange = (val, field, model) => dispatch => {
    console.log('USER field change: ' + field);
    console.log(val);
    switch(field)
    {
        case 'emailId':
        {
            model.emailId = val;
            dispatch({
                type: CURRENT_USER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'role':
        {
            model.role = val;
            dispatch({
                type: CURRENT_USER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
        }
    }
    dispatch({
        type: CURRENT_USER_FIELD_CHANGE_END
    });
}

export const DeleteUser = (userModel) => dispatch => {
    let model ={
        user: userModel
    };
    let url = config.adminApiUrl + 'user';
    console.log('action model', userModel);
    repository.deleteData(url, model)
            .then((res) => {
                console.log('user deleted: ' + res);
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: DELETE_USER_FAIL,
                    payload: err
                });
            });
}

export const AddUser = (userModel) => dispatch => {
    let model ={
        user: userModel
    };
    let url = config.adminApiUrl + 'user';
    console.log('action model', userModel);
    repository.saveData(url, model)
            .then((res) => {
                console.log('user added: ' + res);
                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ADD_USER_FAIL,
                    payload: err
                });
            });
}

export const FetchUsers = () => dispatch => {
    let url = config.adminApiUrl + 'getAllUsers';
    repository.getData(url, history)
        .then((res) => {
            console.log('promise resolved');
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log('promise rejected');
            dispatch({
                type: FETCH_USER_FAIL,
                payload: { errorStatus: '401' }
            });
        });
}

export const UpdateUser = (userModel) => dispatch => {
    let url = config.adminApiUrl + 'user';
    let model ={
        user: userModel
    };
    repository.updateData(url, model, history)
        .then((res) => {
            console.log('promise resolved');
            dispatch({
                type: UPDATE_USER_SUCCESS
            });
        })
        .catch((err) => {
            console.log('promise rejected');
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { errorStatus: '401' }
            });
        });
}

export const SetUserInfo = (res) => dispatch => {
    AuthHelper.Login(res);
    let userInfo = AuthHelper.GetUserInfo();
    dispatch({
        type: SET_USER_INFO_LOCAL,
        payload: userInfo
    })
}
export const LogoutCurrentUser = () => dispatch => {
    AuthHelper.LogOut();
    dispatch({
        type: LOGOUT_CURRENT_USER
    })
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
