import { 
    SEND_TEST_INVITE_SUCCESS,
    INVITE_INFO_FIELD_CHANGE,
    FETCH_INVITES_SUCCESS, EVALUATION_SUCCESS
} from "../actions/InviteConsoleActions";
import { FETCH_TEST_SUCCESS, 
    OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/TestConsoleActions';

export default (state = {}, action) => {
switch(action.type) {
   case SEND_TEST_INVITE_SUCCESS:
   {
       return {
            ...state,
            inivteAdded: 'yes',
            current_test: action.payload
        }
   }
   case FETCH_INVITES_SUCCESS:
   {
        return {
           ...state,
           invitations: action.payload
       }
   }
   case FETCH_TEST_SUCCESS:
   {
        let test = action.payload;
        return {
           ...state,
           current_test: {
               testId: (action.payload) ? action.payload.$loki : 0,
               ...action.payload
           },
           inivteAdded: 'no',
           inviteInfo: {}
       }
   }
   case INVITE_INFO_FIELD_CHANGE:
   {
       
       return {
           ...state,
           field_updated: !state.field_updated,
           inviteInfo: action.payload
       }
   }
   case EVALUATION_SUCCESS:
   {
       return {
           ...state,
           invitations: action.payload
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