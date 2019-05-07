import { 
    SEND_TEST_INVITE_SUCCESS
} from "../actions/InviteConsoleActions";
import { FETCH_TEST_SUCCESS, OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/TestConsoleActions';

export default (state = {}, action) => {
switch(action.type) {
   case SEND_TEST_INVITE_SUCCESS:
   {
       return {
            ...state,
            inivteAdded: !state.inivteAdded,
            current_test: action.payload
        }
   }
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