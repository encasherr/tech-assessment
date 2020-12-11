import { 
    FETCH_TEST_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR,
    PUBLISH_TEST_SUCCESS,
    FETCH_TEST_MCQS_SUCCESS,
    FETCH_TEST_CANDIDATES_SUCCESS
} from "../actions/TestConsoleActions";
import { ADD_QUESTION_TO_TEST, REMOVE_QUESTION_FROM_TEST,
    TEST_SETTINGS_FIELD_CHANGE } from "../actions/TestConsoleActions";

export default (state = {}, action) => {
switch(action.type) {
   case FETCH_TEST_SUCCESS:
   {
       let test = action.payload;
       return {
           ...state,
           current_test: action.payload,
       }
   }
   case FETCH_TEST_MCQS_SUCCESS:
   {
        let mcqs = action.payload;
        return {
            ...state,
            selectedMcqs: action.payload,
        }
   }
   case FETCH_TEST_CANDIDATES_SUCCESS:
   {
       return {
           ...state,
           candidates: action.payload
       }
   }
   case ADD_QUESTION_TO_TEST:
   {
       let mcqToAdd = action.payload;
       return {
            ...state,
            mcqAdded: !state.mcqAdded,
            current_test: action.payload,
            operation: 'MCQ Added'
        }
   }
   case REMOVE_QUESTION_FROM_TEST:
   {
       let mcqToAdd = action.payload;
       return {
            ...state,
            mcqAdded: !state.mcqAdded,
            current_test: action.payload,
            operation: 'MCQ Removed'
        }
   }
   case TEST_SETTINGS_FIELD_CHANGE:
    {
        return {
            ...state,
            current_test: action.payload
        }   
    }
   case OPEN_SNACKBAR:
   {
       return {
           ...state,
           snack_open: true
       }
   }
   case CLOSE_SNACKBAR:
   {
       return {
           ...state,
           snack_open: false
       }
   }
   default: {
       return state;
   }
}
}