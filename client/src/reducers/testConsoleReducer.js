import { 
    FETCH_TEST_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR
} from "../actions/AdminTestActions";
import { ADD_QUESTION_TO_TEST } from "../actions/TestConsoleActions";

export default (state = {}, action) => {
switch(action.type) {
   case FETCH_TEST_SUCCESS:
   {
       console.log('fetch test reducer');
       console.log(action.payload);
       let test = action.payload;
       return {
           ...state,
           current_test: action.payload,
       }
   }
   case ADD_QUESTION_TO_TEST:
   {
       let mcqToAdd = action.payload;
       return {
           ...state
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