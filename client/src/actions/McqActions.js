import axios from 'axios';
import config from '../config';
import repository from '../repository';
import { LogoutCurrentUser } from './UserActions';
import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL } from './CategoryActions';

export const ADD_MCQ_BEGIN = 'ADD_MCQ_BEGIN';
export const ADD_MCQ_SUCCESS = 'ADD_MCQ_SUCCESS';
export const ADD_MCQ_FAIL = 'ADD_MCQ_FAIL';
export const MCQ_SEARCH_END = 'MCQ_SEARCH_END';
export const MCQ_SEARCH_BEGIN = 'MCQ_SEARCH_BEGIN';
export const MCQ_SEARCH_SUCCESS = 'MCQ_SEARCH_SUCCESS';
export const UPDATE_MCQ_BEGIN = 'UPDATE_MCQ_BEGIN';
export const UPDATE_MCQ_SUCCESS = 'UPDATE_MCQ_SUCCESS';
export const UPDATE_MCQ_FAIL = 'UPDATE_MCQ_FAIL';
export const DELETE_MCQ_SUCCESS = 'DELETE_MCQ_SUCCESS';
export const DELETE_MCQ_FAIL = 'DELETE_MCQ_FAIL';
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
    switch(field)
    {
        case 'question':
        {
            model.mcq_meta.question = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'description':
        {
            model.mcq_meta.description = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'category':
        {
            model.mcq_meta.category = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'skill':
        {
            model.mcq_meta.skill = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'minimumExperience':
        {
            model.mcq_meta.minimumExperience = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'maximumExperience':
        {
            model.mcq_meta.maximumExperience = val;
            dispatch({
                type: CURRENT_MCQ_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'score':
        {
            model.mcq_meta.score = val;
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
        if(!mcqModel.mcq_meta.choices && mcqModel.mcq_meta.choices.length === 0) {
            mcqModel.mcq_meta.choices = [];
            answerModel.key = config.instance.OrderedAlphabets[0];
        }
        if(!answerModel.key) {
            let answerKeyIndex = mcqModel.mcq_meta.choices.length === 0 ? 0 : mcqModel.mcq_meta.choices.length; 
            answerModel.key = config.instance.OrderedAlphabets[answerKeyIndex];
        }


        mcqModel.mcq_meta.choices.push(answerModel);
    }
    dispatch({
        type: CHOICE_ADDED_TO_MCQ,
        payload: mcqModel
    })
}

export const AddMcq = (mcqModel) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: ADD_MCQ_BEGIN
        });
        let url = config.instance.getAdminApiUrl() + 'mcq';
        repository.saveData(url, mcqModel)
            .then((res) => {
                dispatch({
                    type: ADD_MCQ_SUCCESS,
                    payload: res.data
                });
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: ADD_MCQ_FAIL,
                    payload: err
                });
                reject(err);
            });

    });
}

export const UpdateMcq = (mcqModel) => dispatch => {
    return new Promise((resolve, reject) => {

        dispatch({
            type: UPDATE_MCQ_BEGIN
        });
        let url = config.instance.getAdminApiUrl() + 'mcq';
        repository.updateData(url, mcqModel)
            .then((res) => {
                dispatch({
                    type: UPDATE_MCQ_SUCCESS
                });
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_MCQ_FAIL,
                    payload: err
                });
                reject(err);
            });
    })
}

export const DeleteMcq = (mcqModel) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'mcq';
    repository.deleteData(url, mcqModel)
        .then((res) => {
            dispatch(FetchMcqs(true));
        })
        .catch((err) => {
            dispatch({
                type: DELETE_MCQ_FAIL,
                payload: err
            });
        });
}

export const BulkDeleteMcq = (mcqs) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'bulkmcq';
    let mcqIdsToDelete = [];
    mcqs.map((item, index) => {
        mcqIdsToDelete.push(item.id);
    })
    let data = {
        mcqIdsToDelete: mcqIdsToDelete
    }
    repository.deleteData(url, data)
        .then((res) => {
            dispatch(FetchMcqs(true));
        })
        .catch((err) => {
            dispatch({
                type: DELETE_MCQ_FAIL,
                payload: err
            });
        });
}

export const BeginSearch = () => dispatch => {
    dispatch({
        type: MCQ_SEARCH_BEGIN
    });
}

export const EndSearch = () => dispatch => {
    dispatch({
        type: MCQ_SEARCH_END
    });
}

 export const SearchMcq = (searchTerm, mcqList) => dispatch => {
    if(mcqList && mcqList.length > 0) {
        let filteredCategories = mcqList.filter((mcqItem) => {
            let item = mcqItem.mcq_meta;
            return (
                    item.question &&
                    item.question.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    ) ||
                    (
                        item.description &&
                        item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        });
        if(filteredCategories && filteredCategories.length > 0) {
            dispatch({
                type: MCQ_SEARCH_SUCCESS,
                payload: {
                    filteredCategories,
                    searchTerm
                }
            });
        }
        else {
            dispatch({
                type: MCQ_SEARCH_SUCCESS,
                payload: {
                    filteredCategories: [],
                    searchTerm
                }
            });
        }
    }
    else {
        dispatch({
            type: MCQ_SEARCH_SUCCESS,
            payload: {
                filteredCategories: [],
                searchTerm
            }
        });
    }
 }

 export const FetchCategories = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'getAllCategories';
    repository.getData(url)
        .then((res) => {
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
    let url = config.instance.getAdminApiUrl() + 'getAllSkills';
    repository.getData(url)
        .then((res) => {
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


export const FetchMcqs = (isDeleted) => dispatch => {
    dispatch({
        type: FETCH_MCQ_BEGIN
    });
    let url = config.instance.getAdminApiUrl() + 'getAllMcqs';
    repository.getData(url)
        .then((res) => {
            let payload = {
                data: res.data,
                message: 'MCQs fetched successfully'
            };
            if(isDeleted) {
                payload.message = 'MCQ deleted successfully';
            }
            dispatch({
                type: FETCH_MCQ_SUCCESS,
                payload: payload
            });
        })
        .catch((err) => {
            if(err.data && err.data.message === 'Invalid token.') {
                dispatch(LogoutCurrentUser());
            }
            else {
                dispatch({
                    type: FETCH_MCQ_FAIL,
                    payload: err.statusText
                });
            }
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
