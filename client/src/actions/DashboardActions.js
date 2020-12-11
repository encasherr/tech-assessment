import config from '../config';
import repository from '../repository';
import { FETCH_INVITES_SUCCESS, FETCH_INVITES_FAIL } from './InviteConsoleActions';

export const VIEW_TEST_COUNT = 'VIEW_TEST_COUNT';
export const VIEW_MCQ_COUNT = 'VIEW_MCQ_COUNT';
export const VIEW_INVITAION_COUNT = 'VIEW_INVITAION_COUNT';
export const FETCH_TEST_COUNT_SUCCESS = 'FETCH_TEST_COUNT_SUCCESS';
export const FETCH_TEST_COUNT_FAIL = 'FETCH_TEST_COUNT_FAIL';
export const FETCH_MCQ_COUNT_SUCCESS = 'FETCH_MCQ_COUNT_SUCCESS';
export const FETCH_MCQ_COUNT_FAIL = 'FETCH_MCQ_COUNT_FAIL';
export const FETCH_INVITATION_COUNT_SUCCESS = 'FETCH_INVITATION_COUNT_SUCCESS';
export const FETCH_INVITATION_COUNT_FAIL = 'FETCH_INVITATION_COUNT_FAIL';
export const FETCH_RECENT_RESPONSES_SUCCESS = 'FETCH_RECENT_RESPONSES_SUCCESS';
export const FETCH_RECENT_RESPONSES_FAIL = 'FETCH_RECENT_RESPONSES_FAIL';

export const FetchRecentResponses = () => dispatch => {
    let url = config.instance.getCandidateApiUrl() + 'getAllInvites';
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_RECENT_RESPONSES_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_RECENT_RESPONSES_FAIL,
                payload: err.statusText
            });
        });
}

export const FetchTestCount = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'dashboard/test/count';
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_TEST_COUNT_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_TEST_COUNT_FAIL,
                payload: err.statusText
            });
        });
}
export const FetchMcqCount = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'dashboard/mcq/count';
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_MCQ_COUNT_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_MCQ_COUNT_FAIL,
                payload: err.statusText
            });
        });
}
export const FetchInvitationCount = () => dispatch => {
    let url = config.instance.getAdminApiUrl() + 'dashboard/invitation/count';
    repository.getData(url)
        .then((res) => {
            dispatch({
                type: FETCH_INVITATION_COUNT_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_INVITATION_COUNT_FAIL,
                payload: err.statusText
            });
        });
}