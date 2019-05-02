import axios from 'axios';
import config from '../config';
import { FETCH_SKILLS_BEGIN, FETCH_SKILLS_FAIL, FETCH_SKILLS_SUCCESS } from './SkillActions';

export const ADD_CANDIDATE_BEGIN = 'ADD_CANDIDATE_BEGIN';
export const ADD_CANDIDATE_SUCCESS = 'ADD_CANDIDATE_SUCCESS';
export const ADD_CANDIDATE_FAIL = 'ADD_CANDIDATE_FAIL';
export const CANDIDATE_SEARCH_BEGIN = 'CANDIDATE_SEARCH_BEGIN';
export const CANDIDATE_SEARCH_SUCCESS = 'CANDIDATE_SEARCH_SUCCESS';
export const UPDATE_CANDIDATE_BEGIN = 'UPDATE_CANDIDATE_BEGIN';
export const UPDATE_CANDIDATE_SUCCESS = 'UPDATE_CANDIDATE_SUCCESS';
export const UPDATE_CANDIDATE_FAIL = 'UPDATE_CANDIDATE_FAIL';
export const SELECT_CANDIDATE = 'SELECT_CANDIDATE';
export const CURRENT_CANDIDATE_FIELD_CHANGE = 'CURRENT_CANDIDATE_FIELD_CHANGE';
export const CURRENT_CANDIDATE_FIELD_CHANGE_END = 'CURRENT_CANDIDATE_FIELD_CHANGE_END';
export const CURRENT_ANSWER_FIELD_CHANGE = 'CURRENT_ANSWER_FIELD_CHANGE';
export const CURRENT_ANSWER_FIELD_CHANGE_END = 'CURRENT_ANSWER_FIELD_CHANGE_END';
export const CHOICE_ADDED_TO_CANDIDATE = 'CHOICE_ADDED_TO_CANDIDATE';
export const FETCH_CANDIDATE_BEGIN = 'FETCH_CANDIDATE_BEGIN';
export const FETCH_CANDIDATE_SUCCESS = 'FETCH_CANDIDATE_SUCCESS';
export const FETCH_CANDIDATE_FAIL = 'FETCH_CANDIDATE_FAIL';
// export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
// export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const CurrentCandidateFieldChange = (val, field, model) => dispatch => {
    console.log('CANDIDATE field change: ' + field);
    console.log(val);
    switch(field)
    {
        case 'fullName':
        {
            model.fullName = val;
            dispatch({
                type: CURRENT_CANDIDATE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'email':
        {
            model.email = val;
            dispatch({
                type: CURRENT_CANDIDATE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'contactno':
        {
            model.contactno = val;
            dispatch({
                type: CURRENT_CANDIDATE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'experienceYears':
        {
            model.experienceYears = val;
            dispatch({
                type: CURRENT_CANDIDATE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'experienceMonths':
        {
            model.experienceMonths = val;
            dispatch({
                type: CURRENT_CANDIDATE_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
        }
    }
    dispatch({
        type: CURRENT_CANDIDATE_FIELD_CHANGE_END
    });
}

export const AddCandidate = (candidateModel, editMode) => dispatch => {
    dispatch({
        type: ADD_CANDIDATE_BEGIN
    });
    let url = config.adminApiUrl + 'candidate';
    console.log('action model');
    console.log(candidateModel);
    // if(!editMode) {
        axios.post(url, candidateModel)
            .then((res) => {
                console.log('CANDIDATE saved: ' + res);
                dispatch({
                    type: ADD_CANDIDATE_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ADD_CANDIDATE_FAIL,
                    payload: err
                });
            });
}

export const BeginSearch = () => dispatch => {
    dispatch({
        type: CANDIDATE_SEARCH_BEGIN
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
//                 type: CANDIDATE_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCANDIDATES,
//                     searchTerm
//                 }
//             });
//         }
//         else {
//             dispatch({
//                 type: CANDIDATE_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCANDIDATES: [],
//                     searchTerm
//                 }
//             });
//         }
//     }
//     else {
//         dispatch({
//             type: CANDIDATE_SEARCH_SUCCESS,
//             payload: {
//                 filteredCANDIDATES: [],
//                 searchTerm
//             }
//         });
//     }
 }

 export const FetchCandidates = () => dispatch => {
    // dispatch({
    //     type: FETCH_CANDIDATES_BEGIN
    // });
    let url = config.adminApiUrl + 'getAllCandidates';
    axios.get(url)
        .then((res) => {
            console.log('CANDIDATES fetched');
            dispatch({
                type: FETCH_CANDIDATE_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CANDIDATE_FAIL,
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

export const SelectCandidate = (candidateModel) => dispatch => {
    dispatch({
        type: SELECT_CANDIDATE,
        payload: candidateModel
    })
}

export const UpdateCandidate = (candidateModel) => dispatch => {
    dispatch({
        type: UPDATE_CANDIDATE_BEGIN
    });
    let url = config.adminApiUrl + 'candidate';
    axios.put(url, candidateModel)
        .then((res) => {
            dispatch({
                type: UPDATE_CANDIDATE_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_CANDIDATE_FAIL,
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
