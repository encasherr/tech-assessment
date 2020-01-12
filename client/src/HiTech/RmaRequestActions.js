import axios from 'axios';
import config from '../config';
import repository from '../repository';

export const INITIALIZE_RMA_FIELDS = 'INITIALIZE_RMA_FIELDS';
export const ADD_RMAREQUESTS_BEGIN = 'ADD_RMAREQUESTS_BEGIN';
export const ADD_RMAREQUESTS_SUCCESS = 'ADD_RMAREQUESTS_SUCCESS';
export const ADD_RMAREQUESTS_FAIL = 'ADD_RMAREQUESTS_FAIL';
export const FETCH_RMAREQUESTS_BEGIN = 'FETCH_RMAREQUESTS_BEGIN';
export const FETCH_RMAREQUESTS_SUCCESS = 'FETCH_RMAREQUESTS_SUCCESS';
export const FETCH_RMAREQUEST_SUCCESS = 'FETCH_RMAREQUEST_SUCCESS';
export const FETCH_RMAREQUEST_FAIL = 'FETCH_RMAREQUEST_FAIL';
export const SELECT_RMA_REQUEST = 'SELECT_RMA_REQUEST';
export const GOBACK_TO_ALL_REQUESTS = 'GOBACK_TO_ALL_REQUESTS';
export const FETCH_RMAREQUESTS_FAIL = 'FETCH_RMAREQUESTS_FAIL';
export const UPDATE_RMAREQUESTS_BEGIN = 'UPDATE_RMAREQUESTS_BEGIN';
export const UPDATE_RMAREQUESTS_SUCCESS = 'UPDATE_RMAREQUESTS_SUCCESS';
export const UPDATE_RMAREQUESTS_FAIL = 'UPDATE_RMAREQUESTS_FAIL';
export const CURRENT_RMAREQUESTS_FIELD_CHANGE = 'CURRENT_RMAREQUESTS_FIELD_CHANGE';
export const CURRENT_RMAREQUESTS_FIELD_CHANGE_END = 'CURRENT_RMAREQUESTS_FIELD_CHANGE_END';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';

export const InitializeRmaFields = () => dispatch => {
    dispatch({
        type: INITIALIZE_RMA_FIELDS
    })
} 

export const CurrentRmaRequestFieldChange = (val, field, model) => dispatch => {
    /*switch(field)
    {
        case 'customerName':
        {
            model.customerName = val;
            break;
        }
        case 'address':
        {
            model.address = val;
            break;
        }
        case 'telephone':
        {
            model.telephone = val;
            break;
        }
        case 'fax':
        {
            model.fax = val;
            break;
        }
        case 'email':
        {
            model.email = val;
            break;
        }
        case 'address':
        {
            model.contactPerson = val;
            break;
        }
    }*/
    if(!model.customerDetails) model.customerDetails = {};
    model.customerDetails[field] = val;
    model.field_version = model.field_version++;
    dispatch({
        type: CURRENT_RMAREQUESTS_FIELD_CHANGE,
        payload: model
    });
}

export const AddProductToRma = (productItem, model) => dispatch => {
    if(!model.productList) model.productList = [];
    model.productList.push(productItem);
    console.log('model.productList', model.productList.length);
    dispatch({
        type: CURRENT_RMAREQUESTS_FIELD_CHANGE,
        payload: model
    });
}

export const VendorDetailsFieldChange = (val, field, model) => dispatch => {
    if(!model.vendorDetails) model.vendorDetails = {};
    model.vendorDetails[field] = val;
    dispatch({
        type: CURRENT_RMAREQUESTS_FIELD_CHANGE,
        payload: model
    });
}

export const ProductFieldChange = (val, field, model) => dispatch => {
    if(!model.current_product) model.current_product = {};
    model.current_product[field] = val;
    dispatch({
        type: CURRENT_RMAREQUESTS_FIELD_CHANGE,
        payload: model
    });
}

export const AddRmaRequest = (rmaRequestModel) => dispatch => {
    dispatch({
        type: ADD_RMAREQUESTS_BEGIN
    });
    let url = config.hitechApiUrl + 'rmaRequest';
    console.log('action model');
    console.log(rmaRequestModel);
    rmaRequestModel.emailTo = 'alok.coolaj@gmail.com';
    repository.saveData(url, rmaRequestModel)
        .then((res) => {
            console.log('rma request saved: ' + res);
            dispatch({
                type: ADD_RMAREQUESTS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: ADD_RMAREQUESTS_FAIL,
                payload: err
            });
        });
}

export const UpdateRmaRequest = (rmaRequestModel) => dispatch => {
    dispatch({
        type: UPDATE_RMAREQUESTS_BEGIN
    });
    let url = config.hitechApiUrl + 'rmaRequest';
    repository.updateData(url, rmaRequestModel)
        .then((res) => {
            dispatch({
                type: UPDATE_RMAREQUESTS_SUCCESS
            });
        })
        .catch((err) => {
            dispatch({
                type: UPDATE_RMAREQUESTS_FAIL,
                payload: err
            });
        });
}

export const FetchRmaRequests = () => dispatch => {
    dispatch({
        type: FETCH_RMAREQUESTS_BEGIN
    });
    let url = config.hitechApiUrl + 'rmaRequests';
    repository.getData(url)
        .then((res) => {
            console.log('rma requests fetched');
            dispatch({
                type: FETCH_RMAREQUESTS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_RMAREQUESTS_FAIL,
                payload: err
            });
        });
}

export const FetchRmaRequest = (rmaRequestId) => dispatch => {
    
    let url = config.hitechApiUrl + 'rmaRequest/' + rmaRequestId;
    repository.getData(url)
        .then((res) => {
            console.log('rma single request fetched');
            dispatch({
                type: FETCH_RMAREQUEST_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_RMAREQUEST_FAIL,
                payload: err
            });
        });
}

export const SelectRmaRequest = (rmaRequest) => dispatch => {
    dispatch({
        type: SELECT_RMA_REQUEST,
        payload: rmaRequest
    })
}

export const GoBackToAllRequests = () => dispatch => {
    dispatch({
        type: GOBACK_TO_ALL_REQUESTS
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
