import { combineReducers } from 'redux';
import categoryReducer from "./categoryReducer";
import skillReducer from "./skillReducer";
import mcqReducer from "./mcqReducer";
import candidateReducer from './candidateReducer';
import adminTestReducer from './adminTestReducer';
import testConsoleReducer from './testConsoleReducer';

export default combineReducers({
    categoryReducer,
    skillReducer,
    mcqReducer,
    candidateReducer,
    adminTestReducer,
    testConsoleReducer
});