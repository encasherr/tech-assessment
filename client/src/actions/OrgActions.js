import config from '../config';
import repository from '../repository';

export const ADD_ORG_BEGIN = 'ADD_ORG_BEGIN';
export const ADD_ORG_SUCCESS = 'ADD_ORG_SUCCESS';
export const ADD_ORG_FAIL = 'ADD_ORG_FAIL';
export const DELETE_ORG_BEGIN = 'DELETE_ORG_BEGIN';
export const DELETE_ORG_SUCCESS = 'DELETE_ORG_SUCCESS';
export const DELETE_ORG_FAIL = 'DELETE_ORG_FAIL';
export const UPDATE_ORG_BEGIN = 'UPDATE_ORG_BEGIN';
export const UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS';
export const UPDATE_ORG_FAIL = 'UPDATE_ORG_FAIL';
export const SELECT_ORG = 'SELECT_ORG';
export const CURRENT_ORG_FIELD_CHANGE = 'CURRENT_ORG_FIELD_CHANGE';
export const CURRENT_ORG_FIELD_CHANGE_END = 'CURRENT_ORG_FIELD_CHANGE_END';
export const FETCH_ORGS_BEGIN = 'FETCH_ORGS_BEGIN';
export const FETCH_ORGS_SUCCESS = 'FETCH_ORGS_SUCCESS';
export const FETCH_ORGS_FAIL = 'FETCH_ORGS_FAIL';

export const CurrentOrgFieldChange = (val, field, model) => dispatch => {
    switch(field)
    {
        case 'name':
        {
            model.org_meta.name = val;
            dispatch({
                type: CURRENT_ORG_FIELD_CHANGE,
                payload: model
            });
            break;
        }
        case 'city':
        {
            model.org_meta.city = val;
            dispatch({
                type: CURRENT_ORG_FIELD_CHANGE,
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
        type: CURRENT_ORG_FIELD_CHANGE_END
    });
}

export const AddOrg = (orgModel) => dispatch => {
    
        return new Promise((resolve, reject) => {
            let url = config.instance.getAdminApiUrl() + 'org';
            console.log('action model');
            console.log(orgModel);
            repository.saveData(url, orgModel)
                .then((res) => {
                    console.log('org saved: ' + res);
                    dispatch({
                        type: ADD_ORG_SUCCESS,
                        payload: res.data
                    });
                })
                .then((res) => {
                    resolve(true);
                })
                .catch((err) => {
                    dispatch({
                        type: ADD_ORG_FAIL,
                        payload: err.statusText
                    });
                    reject(err);
                });
        })
}

export const DeleteOrg = (orgModel) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'org';
    repository.deleteData(url, orgModel)
        .then((res) => {
            dispatch(FetchOrgs());
        })
        .catch((err) => {
            dispatch({
                type: DELETE_ORG_FAIL,
                payload: err.statusText
            });
        });
}

export const SelectOrg = (orgModel) => dispatch => {
    console.log('select org', orgModel);
    dispatch({
        type: SELECT_ORG,
        payload: orgModel
    })
}

export const UpdateOrg = (orgModel) => dispatch => {
    return new Promise((resolve, reject) => {

        let url = config.instance.getAdminApiUrl() + 'org';
        repository.updateData(url, orgModel)
            .then((res) => {
                dispatch({
                    type: UPDATE_ORG_SUCCESS
                });
            })
            .then((res) => {
                resolve(true);
            })
            .catch((err) => {
                dispatch({
                    type: UPDATE_ORG_FAIL,
                    payload: err.statusText
                });
                reject(err);
            });
    })
}

export const FetchOrgs = () => dispatch => {
    dispatch({
        type: FETCH_ORGS_BEGIN
    });
    let url = config.instance.getAdminApiUrl() + 'getAllOrgs';
    repository.getData(url)
        .then((res) => {
            console.log('orgs fetched');
            dispatch({
                type: FETCH_ORGS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_ORGS_FAIL,
                payload: err.statusText
            });
        });
}
