import {
    FETCH_MY_REGISTERED_TESTS_SUCCESS, FETCH_MY_REGISTERED_TESTS_FAIL,
    FETCH_TESTS_AVAILABLE_FOR_ME_SUCCESS, FETCH_TESTS_AVAILABLE_FOR_ME_FAIL
} from "../actions/RegisteredTestActions";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MY_REGISTERED_TESTS_SUCCESS:
            {
                return {
                    ...state,
                    error: null,
                    registeredTests: action.payload
                }
            }
        case FETCH_MY_REGISTERED_TESTS_FAIL:
            {
                return {
                    ...state,
                    error: action.payload
                }
            }
        case FETCH_TESTS_AVAILABLE_FOR_ME_SUCCESS:
            {
                let arr = [];
                if (action.payload && action.payload.length > 0) {
                    action.payload.map((item, index) => {
                        arr.push(item);
                    })
                }
                return {
                    ...state,
                    error: null,
                    upcomingTests: arr
                }
            }
        case FETCH_TESTS_AVAILABLE_FOR_ME_FAIL:
            {
                return {
                    ...state,
                    error: action.payload
                }
            }

        default: {
            return state;
        }
    }
}