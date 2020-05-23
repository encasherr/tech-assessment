import config from '../config';
import repository from '../repository';

export const ADD_CATEGORY_BEGIN = 'ADD_CATEGORY_BEGIN';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL';
export const DELETE_CATEGORY_BEGIN = 'DELETE_CATEGORY_BEGIN';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL';
export const CATEGORY_SEARCH_BEGIN = 'CATEGORY_SEARCH_BEGIN';
export const CATEGORY_SEARCH_SUCCESS = 'CATEGORY_SEARCH_SUCCESS';
export const UPDATE_CATEGORY_BEGIN = 'UPDATE_CATEGORY_BEGIN';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const CURRENT_CATEGORY_FIELD_CHANGE = 'CURRENT_CATEGORY_FIELD_CHANGE';
export const CURRENT_CATEGORY_FIELD_CHANGE_END = 'CURRENT_CATEGORY_FIELD_CHANGE_END';
export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAIL = 'FETCH_CATEGORIES_FAIL';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const CurrentCategoryFieldChange = (val, field, model) => dispatch => {
    switch(field)
    {
        case 'title':
        {
            model.category_meta.title = val;
            dispatch({
                type: CURRENT_CATEGORY_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'description':
        {
            model.category_meta.description = val;
            dispatch({
                type: CURRENT_CATEGORY_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        default:
        {
            break;
        }
    }
    dispatch({
        type: CURRENT_CATEGORY_FIELD_CHANGE_END
    });
}

export const AddCategory = (categoryModel, editMode) => dispatch => {
    dispatch({
        type: ADD_CATEGORY_BEGIN
    });
    let url = config.instance.getAdminApiUrl() + 'category';
    if(!editMode) {
        repository.saveData(url, categoryModel)
            .then((res) => {
                dispatch({
                    type: ADD_CATEGORY_SUCCESS,
                    payload: res.data
                });
            })
            .catch((err) => {
                dispatch({
                    type: ADD_CATEGORY_FAIL,
                    payload: err
                });
            });
    }
    else {
        dispatch(UpdateCategory(categoryModel));
    }
}

export const DeleteCategory = (categoryModel) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'category';
    repository.deleteData(url, categoryModel)
        .then((res) => {
            dispatch(FetchCategories());
        })
        .catch((err) => {
            dispatch({
                type: DELETE_CATEGORY_FAIL,
                payload: err
            });
        });
}

export const BeginSearch = () => dispatch => {
    dispatch({
        type: CATEGORY_SEARCH_BEGIN
    });
}

export const SearchCategory = (searchTerm, categoryList) => dispatch => {
    if(categoryList && categoryList.length > 0) {
        let filteredCategories = categoryList.filter((item) => {
            return (
                    item.title &&
                    item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                    ) ||
                    (
                        item.description &&
                        item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        });
        if(filteredCategories && filteredCategories.length > 0) {
            dispatch({
                type: CATEGORY_SEARCH_SUCCESS,
                payload: {
                    filteredCategories,
                    searchTerm
                }
            });
        }
        else {
            dispatch({
                type: CATEGORY_SEARCH_SUCCESS,
                payload: {
                    filteredCategories: [],
                    searchTerm
                }
            });
        }
    }
    else {
        dispatch({
            type: CATEGORY_SEARCH_SUCCESS,
            payload: {
                filteredCategories: [],
                searchTerm
            }
        });
    }
}

export const SelectCategory = (categoryModel) => dispatch => {
    dispatch({
        type: SELECT_CATEGORY,
        payload: categoryModel
    })
}

export const UpdateCategory = (categoryModel) => dispatch => {
    dispatch({
        type: UPDATE_CATEGORY_BEGIN
    });
    let url = config.instance.getAdminApiUrl() + 'category';
    repository.updateData(url, categoryModel)
        .then((res) => {
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_CATEGORY_FAIL,
                payload: err
            });
        });
}

export const FetchCategories = () => dispatch => {
    dispatch({
        type: FETCH_CATEGORIES_BEGIN
    });
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
