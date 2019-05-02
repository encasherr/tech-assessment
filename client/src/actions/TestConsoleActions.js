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
// export const FETCH_SKILLS_SUCCESS = 'FETCH_SKILLS_SUCCESS';
// export const FETCH_SKILLS_FAIL = 'FETCH_SKILLS_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

// export const CurrentTestFieldChange = (val, field, model) => dispatch => {
//     console.log('test field change: ' + field);
//     console.log(val);
//     switch(field)
//     {
//         case 'testName':
//         {
//             model.testName = val;
//             dispatch({
//                 type: CURRENT_QUESTION_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         case 'skill':
//         {
//             model.skill = val;
//             dispatch({
//                 type: CURRENT_QUESTION_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         case 'duration':
//         {
//             model.duration = val;
//             dispatch({
//                 type: CURRENT_QUESTION_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         case 'experienceYears':
//         {
//             model.experienceYears = val;
//             dispatch({
//                 type: CURRENT_QUESTION_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         default:
//         {
//         }
//     }
//     dispatch({
//         type: CURRENT_QUESTION_FIELD_CHANGE_END
//     });
// }

// export const CurrentAnswerFieldChange = (val, field, model) => dispatch => {
//     console.log('test answer field change: ' + field);
//     console.log(val);
//     switch(field)
//     {
//         case 'content':
//         {
//             model.content = val;
//             dispatch({
//                 type: CURRENT_ANSWER_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         case 'isCorrect':
//         {
//             model.isCorrect = val;
//             dispatch({
//                 type: CURRENT_ANSWER_FIELD_CHANGE,
//                 payload: model
//             });
//             break;
//         }
//         default:
//         {
//         }
//     }
//     dispatch({
//         type: CURRENT_ANSWER_FIELD_CHANGE_END
//     });
// }

// export const AddAnswerChoice = (answerModel, testModel) => dispatch => {
//     if(testModel) {
//         if(!testModel.choices) {
//             testModel.choices = [];
//         }
//         testModel.choices.push(answerModel);
//     }
//     dispatch({
//         type: CHOICE_ADDED_TO_TEST,
//         payload: testModel
//     })
// }

export const AddMcqToTest = (mcqId) => dispatch => {
    dispatch({
        type: ADD_QUESTION_TO_TEST,
        payload: mcqId
    })
    
}

// export const BeginSearch = () => dispatch => {
//     dispatch({
//         type: TEST_SEARCH_BEGIN
//     });
// }

 export const SearchTest = (searchTerm, testList) => dispatch => {
//     console.log(`search term: ${searchTerm}, list length: ${testList ? testList.length : 0}`);
//     if(testList && testList.length > 0) {
//         let filteredCategories = testList.filter((item) => {
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
//                 type: TEST_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCategories,
//                     searchTerm
//                 }
//             });
//         }
//         else {
//             dispatch({
//                 type: TEST_SEARCH_SUCCESS,
//                 payload: {
//                     filteredCategories: [],
//                     searchTerm
//                 }
//             });
//         }
//     }
//     else {
//         dispatch({
//             type: TEST_SEARCH_SUCCESS,
//             payload: {
//                 filteredCategories: [],
//                 searchTerm
//             }
//         });
//     }
 }

// export const FetchCategories = () => dispatch => {
//     // dispatch({
//     //     type: FETCH_CATEGORIES_BEGIN
//     // });
//     let url = config.adminApiUrl + 'getAllCategories';
//     axios.get(url)
//         .then((res) => {
//             console.log('categories fetched');
//             dispatch({
//                 type: FETCH_CATEGORIES_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: FETCH_CATEGORIES_FAIL,
//                 payload: err
//             });
//         });
// }

// export const FetchSkills = () => dispatch => {
//     let url = config.adminApiUrl + 'getAllSkills';
//     axios.get(url)
//         .then((res) => {
//             console.log('skills fetched');
//             dispatch({
//                 type: FETCH_SKILLS_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: FETCH_SKILLS_FAIL,
//                 payload: err
//             });
//         });
// }

// // export const SelectMcq = (testModel) => dispatch => {
// //     dispatch({
// //         type: SELECT_TEST,
// //         payload: testModel
// //     })
// // }

// export const UpdateTest = (testModel) => dispatch => {
//     dispatch({
//         type: UPDATE_QUESTION_BEGIN
//     });
//     let url = config.adminApiUrl + 'test';
//     axios.put(url, testModel)
//         .then((res) => {
//             dispatch({
//                 type: UPDATE_QUESTION_SUCCESS
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: UPDATE_QUESTION_FAIL,
//                 payload: err
//             });
//         });
// }

// export const FetchTests = () => dispatch => {
//     dispatch({
//         type: FETCH_QUESTION_BEGIN
//     });
//     let url = config.adminApiUrl + 'getAllTests';
//     axios.get(url)
//         .then((res) => {
//             console.log('TEST fetched');
//             dispatch({
//                 type: FETCH_QUESTION_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch((err) => {
//             dispatch({
//                 type: FETCH_QUESTION_FAIL,
//                 payload: err
//             });
//         });
// }

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
