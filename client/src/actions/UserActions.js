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
    switch(field)
    {
        case 'emailId':
        {
            model.user_meta.emailId = val;
            dispatch({
                type: CURRENT_USER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'name':
        {
            model.user_meta.name = val;
            dispatch({
                type: CURRENT_USER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'role':
        {
            model.user_meta.role = val;
            dispatch({
                type: CURRENT_USER_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'orgId':
        {
            model.user_meta.orgId = val;
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
    return new Promise((resolve, reject) => {

        let url = config.instance.getAdminApiUrl() + 'user';
        repository.deleteData(url, userModel)
                .then((res) => {
                    dispatch({
                        type: DELETE_USER_SUCCESS,
                        payload: res.data
                    });
                })
                .then((res) => {
                    resolve(true);
                })
                .catch((err) => {
                    dispatch({
                        type: DELETE_USER_FAIL,
                        payload: err
                    });
                    reject(err);
                });
    })
}

export const AddUser = (userModel) => dispatch => {
    return new Promise((resolve, reject) => {

        let model ={
            user_meta: userModel
        };
        let url = config.instance.getAdminApiUrl() + 'user';
        repository.saveData(url, userModel)
                .then((res) => {
                    dispatch({
                        type: ADD_USER_SUCCESS,
                        payload: res.data
                    });
                })
                .then((res) => {
                    resolve(true);
                })
                .catch((err) => {
                    dispatch({
                        type: ADD_USER_FAIL,
                        payload: err
                    });
                    reject(err);
                });
    })
}

export const FetchUsers = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'getAllUsers';
    repository.getData(url, history)
        .then((res) => {
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_USER_FAIL,
                payload: err.statusText
            });
        });
}

export const UpdateUser = (userModel) => dispatch => {
    return new Promise((resolve, reject) => {

        let url = config.instance.getAdminApiUrl() + 'user';
        repository.updateData(url, userModel, history)
            .then((res) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS
                });
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: { errorStatus: '401' }
                });
                reject(err);
            });
    })
}

export const SetUserInfo = (res) => dispatch => {
    return new Promise((resolve, reject) => {
        AuthHelper.Login(res);
        let userInfo = AuthHelper.GetUserInfo();
        dispatch({
            type: SET_USER_INFO_LOCAL,
            payload: userInfo
        });
        resolve(true);
    })
}
export const LogoutCurrentUser = () => dispatch => {
    AuthHelper.LogOut();
    dispatch({
        type: LOGOUT_CURRENT_USER
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
