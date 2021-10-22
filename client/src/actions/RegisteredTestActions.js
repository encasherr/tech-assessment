import config from '../config';
import repository from '../repository';
import { LogoutCurrentUser } from './UserActions';

export const FETCH_MY_REGISTERED_TESTS = 'FETCH_MY_REGISTERED_TESTS';
export const FETCH_MY_REGISTERED_TESTS_SUCCESS = 'FETCH_MY_REGISTERED_TESTS_SUCCESS';
export const FETCH_MY_REGISTERED_TESTS_FAIL = 'FETCH_MY_REGISTERED_TESTS_FAIL';
export const FETCH_TESTS_AVAILABLE_FOR_ME_SUCCESS = 'FETCH_TESTS_AVAILABLE_FOR_ME_SUCCESS';
export const FETCH_TESTS_AVAILABLE_FOR_ME_FAIL = 'FETCH_TESTS_AVAILABLE_FOR_ME_FAIL';

export const FetchMyRegisteredTests = () => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getCandidateApiUrl() + 'getMyRegistrations';
        repository.getData(url)
            .then((res) => {
                dispatch({
                    type: FETCH_MY_REGISTERED_TESTS_SUCCESS,
                    payload: res.data
                });
                resolve(res.data);
            })
            .catch((err) => {
                if(err.data && err.data.message === 'Invalid token.') {
                    dispatch(LogoutCurrentUser());
                }
                else {
                    dispatch({
                        type: FETCH_MY_REGISTERED_TESTS_FAIL,
                        payload: err
                    });
                }
                reject(err);
            });

    })
}

export const FetchPublicTests = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'testsAvailableForMe';
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_TESTS_AVAILABLE_FOR_ME_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            if(err.data && err.data.message === 'Invalid token.') {
                dispatch(LogoutCurrentUser());
            }
            else {
                dispatch({
                    type: FETCH_TESTS_AVAILABLE_FOR_ME_FAIL,
                    payload: err.statusText
                });
            }
        });
}
