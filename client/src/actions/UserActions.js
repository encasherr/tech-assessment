import axios from 'axios';
import config from '../config';
import { FETCH_SKILLS_BEGIN, FETCH_SKILLS_FAIL, FETCH_SKILLS_SUCCESS } from './SkillActions';

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
// export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
// export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

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

export const AddCandidate = (userModel, editMode) => dispatch => {
    dispatch({
        type: ADD_USER_BEGIN
    });
    let url = config.adminApiUrl + 'candidate';
    console.log('action model');
    console.log(userModel);
    // if(!editMode) {
        axios.post(url, userModel)
            .then((res) => {
                console.log('CANDIDATE saved: ' + res);
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

export const BeginSearch = () => dispatch => {
    dispatch({
        type: USER_SEARCH_BEGIN
    });
}

 export const SearchCandidate = (searchTerm, candidateList) => dispatch => {
//     console.log(`search term: ${searchTerm}, list length: ${CANDIDATEList ? CANDIDATEList.length : 0}`);
//     if(CANDIDATEList && CANDIDATEList.length > 0) {
//         let filteredCANDIDATES = CANDIDATEList.filter((item) => {
//             return (
//                     item.title &&
//                     item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
//                     ) ||
//                     (
//                         item.description &&
//                         item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
//         });
//         if(filteredCANDIDATES && filteredCANDIDATES.length > 0) {
//             dispatch({
//                 type: USER_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCANDIDATES,
//                     searchTerm
//                 }
//             });
//         }
//         else {
//             dispatch({
//                 type: USER_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCANDIDATES: [],
//                     searchTerm
//                 }
//             });
//         }
//     }
//     else {
//         dispatch({
//             type: USER_SEARCH_SUCCESS,
//             payload: {
//                 filteredCANDIDATES: [],
//                 searchTerm
//             }
//         });
//     }
 }

 export const FetchUsers = () => dispatch => {
    // dispatch({
    //     type: FETCH_USERS_BEGIN
    // });
    let url = config.adminApiUrl + 'getAllUsers';
    axios.get(url)
        .then((res) => {
            console.log('Users fetched');
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_USER_FAIL,
                payload: err
            });
        });
}

export const FetchSkills = () => dispatch => {
    dispatch({
        type: FETCH_SKILLS_BEGIN
    });
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

export const SelectCandidate = (userModel) => dispatch => {
    dispatch({
        type: SELECT_USER,
        payload: userModel
    })
}

export const UpdateUser = (userModel) => dispatch => {
    dispatch({
        type: UPDATE_USER_BEGIN
    });
    let url = config.adminApiUrl + 'user';
    axios.put(url, userModel)
        .then((res) => {
            dispatch({
                type: UPDATE_USER_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_USER_FAIL,
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
