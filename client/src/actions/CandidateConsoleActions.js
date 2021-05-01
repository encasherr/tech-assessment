import config from '../config';
import repository from '../repository';

export const FETCH_CANDIDATE_RESPONSE_REPORT_SUCCESS = 'FETCH_CANDIDATE_RESPONSE_REPORT_SUCCESS';
export const FETCH_CANDIDATE_RESPONSE_REPORT_FAIL = 'FETCH_CANDIDATE_RESPONSE_REPORT_FAIL';
export const FETCH_CANDIDATE_DETAILS_SUCCESS = 'FETCH_CANDIDATE_DETAILS_SUCCESS';
export const FETCH_CANDIDATE_DETAILS_FAIL = 'FETCH_CANDIDATE_DETAILS_FAIL';
export const FETCH_RECORDINGS_SUCCESS = 'FETCH_RECORDINGS_SUCCESS';
export const FETCH_RECORDINGS_FAIL = 'FETCH_RECORDINGS_FAIL';

export const FetchCandidateResponseReport = (responseId) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'getCandidateResponseReport' + '?responseId=' + responseId;
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_CANDIDATE_RESPONSE_REPORT_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CANDIDATE_RESPONSE_REPORT_FAIL,
                payload: err
            });
        });
}

export const FetchCandidateDetails = (candidateId) => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'getCandidateDetails' + '?candidateId=' + candidateId;
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_CANDIDATE_DETAILS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CANDIDATE_DETAILS_FAIL,
                payload: err
            });
        });
}

export const FetchRecordings = (responseId) => dispatch => {
    let url = config.instance.getCandidateApiUrl() + 'getRecordingFileNames' + '?responseId=' + responseId;
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_RECORDINGS_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_RECORDINGS_FAIL,
                payload: err
            });
        });
}