import { combineReducers } from 'redux';
import categoryReducer from "./categoryReducer";
import skillReducer from "./skillReducer";
import mcqReducer from "./mcqReducer";

export default combineReducers({
    categoryReducer,
    skillReducer,
    mcqReducer
});