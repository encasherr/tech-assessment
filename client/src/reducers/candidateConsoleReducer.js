import {
    FETCH_CANDIDATE_RESPONSE_REPORT_SUCCESS,
    FETCH_CANDIDATE_RESPONSE_REPORT_FAIL,
    FETCH_CANDIDATE_DETAILS_FAIL,
    FETCH_CANDIDATE_DETAILS_SUCCESS
} from "../actions/CandidateConsoleActions";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CANDIDATE_RESPONSE_REPORT_SUCCESS:
            {
                return {
                    ...state,
                    candidateResponses: action.payload || {},
                }
            }
        case FETCH_CANDIDATE_RESPONSE_REPORT_FAIL:
            {
                return {
                    ...state
                }
            }
            case FETCH_CANDIDATE_DETAILS_SUCCESS:
            {
                return {
                    ...state,
                    candidateDetails: action.payload
                }
            }
            case FETCH_CANDIDATE_DETAILS_FAIL: 
            {

            }
        default: {
            return state;
        }
    }
}