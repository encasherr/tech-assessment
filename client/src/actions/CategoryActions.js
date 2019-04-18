import axios from 'axios';
import config from '../config';

export const ADD_CATEGORY_BEGIN = 'ADD_CATEGORY_BEGIN';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAIL = 'ADD_CATEGORY_FAIL';

export const AddCategory = (categoryModel) => dispatch => {
    dispatch({
        type: ADD_CATEGORY_BEGIN
    });
    let url = config.adminApiUrl + category;
    axios.post(url, categoryModel)
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
            })
        })  

}