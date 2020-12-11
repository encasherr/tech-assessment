import { 
    FETCH_TEST_COUNT_SUCCESS,
    FETCH_INVITATION_COUNT_SUCCESS, 
    FETCH_MCQ_COUNT_SUCCESS,
    FETCH_RECENT_RESPONSES_SUCCESS,
    FETCH_RECENT_RESPONSES_FAIL } from "../actions/DashboardActions";



export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TEST_COUNT_SUCCESS:
            {
                return {
                    ...state,
                    error: null,
                    testCount: action.payload
                }
            }
        case FETCH_INVITATION_COUNT_SUCCESS:
            {
                return {
                    ...state,
                    error: null,
                    invitationCount: action.payload
                }
            }
        case FETCH_MCQ_COUNT_SUCCESS:
            {
                return {
                    ...state,
                    error: null,
                    mcqCount: action.payload
                }
            }
            case FETCH_RECENT_RESPONSES_SUCCESS: {
                let recentResponses = action.payload;
                if(recentResponses) {
                    recentResponses = recentResponses.sort().slice(0, 5);
                }
                return {
                    ...state,
                    error: null,
                    recentResponses: recentResponses
                }
            }

        default: {
            return state;
        }
    }
}    