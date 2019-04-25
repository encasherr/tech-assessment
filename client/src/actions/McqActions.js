import axios from 'axios';
import config from '../config';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from './CategoryActions';

export const ADD_MCQ_BEGIN = 'ADD_MCQ_BEGIN';
export const ADD_MCQ_SUCCESS = 'ADD_MCQ_SUCCESS';
export const ADD_MCQ_FAIL = 'ADD_MCQ_FAIL';
export const MCQ_SEARCH_BEGIN = 'MCQ_SEARCH_BEGIN';
export const MCQ_SEARCH_SUCCESS = 'MCQ_SEARCH_SUCCESS';
export const UPDATE_MCQ_BEGIN = 'UPDATE_MCQ_BEGIN';
export const UPDATE_MCQ_SUCCESS = 'UPDATE_MCQ_SUCCESS';
export const UPDATE_MCQ_FAIL = 'UPDATE_MCQ_FAIL';
export const SELECT_MCQ = 'SELECT_MCQ';
export const CURRENT_MCQ_FIELD_CHANGE = 'CURRENT_MCQ_FIELD_CHANGE';
export const CURRENT_MCQ_FIELD_CHANGE_END = 'CURRENT_MCQ_FIELD_CHANGE_END';
export const CURRENT_ANSWER_FIELD_CHANGE = 'CURRENT_ANSWER_FIELD_CHANGE';
export const CURRENT_ANSWER_FIELD_CHANGE_END = 'CURRENT_ANSWER_FIELD_CHANGE_END';
export const CHOICE_ADDED_TO_MCQ = 'CHOICE_ADDED_TO_MCQ';
export const FETCH_MCQ_BEGIN = 'FETCH_MCQ_BEGIN';
export const FETCH_MCQ_SUCCESS = 'FETCH_MCQ_SUCCESS';
export const FETCH_MCQ_FAIL = 'FETCH_MCQ_FAIL';
export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const CurrentMcqFieldChange = (val, field, model) => dispatch => {
    console.log('mcq field change: ' + field);
    console.log(val);
    switch(field)
    {
        case 'question':
        {
            model.question = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'description':
        {
            model.description = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'category':
        {
            model.category = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'skill':
        {
            model.skill = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'minimumExperience':
        {
            model.minimumExperience = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'maximumExperience':
        {
            model.maximumExperience = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
        }
    }
    dispatch({
        type: CURRENT_MCQ_FIELD_CHANGE_END
    });
}

export const CurrentAnswerFieldChange = (val, field, model) => dispatch => {
    console.log('mcq answer field change: ' + field);
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

export const AddAnswerChoice = (answerModel, mcqModel) => dispatch => {
    if(mcqModel) {
        if(!mcqModel.choices) {
            mcqModel.choices = [];
        }
        mcqModel.choices.push(answerModel);
    }
    dispatch({
        type: CHOICE_ADDED_TO_MCQ,
        payload: mcqModel
    })
}

export const AddMcq = (mcqModel, editMode) => dispatch => {
    dispatch({
        type: ADD_MCQ_BEGIN
    });
    let url = config.adminApiUrl + 'mcq';
    console.log('action model');
    console.log(mcqModel);
    // if(!editMode) {
        axios.post(url, mcqModel)
            .then((res) => {
                console.log('mcq saved: ' + res);
                dispatch({
                    type: ADD_MCQ_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ADD_MCQ_FAIL,
                    payload: err
                });
            });
    // }
    // else {
    //     dispatch(UpdateMcq(mcqModel));
    // }
}

export const BeginSearch = () => dispatch => {
    dispatch({
        type: MCQ_SEARCH_BEGIN
    });
}

 export const SearchMcq = (searchTerm, mcqList) => dispatch => {
//     console.log(`search term: ${searchTerm}, list length: ${mcqList ? mcqList.length : 0}`);
//     if(mcqList && mcqList.length > 0) {
//         let filteredCategories = mcqList.filter((item) => {
//             return (
//                     item.title &&
//                     item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
//                     ) ||
//                     (
//                         item.description &&
//                         item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
//         });
//         if(filteredCategories && filteredCategories.length > 0) {
//             dispatch({
//                 type: MCQ_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCategories,
//                     searchTerm
//                 }
//             });
//         }
//         else {
//             dispatch({
//                 type: MCQ_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCategories: [],
//                     searchTerm
//                 }
//             });
//         }
//     }
//     else {
//         dispatch({
//             type: MCQ_SEARCH_SUCCESS,
//             payload: {
//                 filteredCategories: [],
//                 searchTerm
//             }
//         });
//     }
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

export const SelectMcq = (mcqModel) => dispatch => {
    dispatch({
        type: SELECT_MCQ,
        payload: mcqModel
    })
}

export const UpdateMcq = (mcqModel) => dispatch => {
    dispatch({
        type: UPDATE_MCQ_BEGIN
    });
    let url = config.adminApiUrl + 'mcq';
    axios.put(url, mcqModel)
        .then((res) => {
            dispatch({
                type: UPDATE_MCQ_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_MCQ_FAIL,
                payload: err
            });
        });
}

export const FetchMcqs = () => dispatch => {
    dispatch({
        type: FETCH_MCQ_BEGIN
    });
    let url = config.adminApiUrl + 'getAllMcqs';
    axios.get(url)
        .then((res) => {
            console.log('MCQ fetched');
            dispatch({
                type: FETCH_MCQ_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_MCQ_FAIL,
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
