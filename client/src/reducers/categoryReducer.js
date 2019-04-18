import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL } from "../actions/CategoryActions";

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_CATEGORY_SUCCESS:
        {
            return {
                ...state,
                category: action.payload
            }
        }
        case ADD_CATEGORY_FAIL:
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