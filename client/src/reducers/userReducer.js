import { 
    ADD_USER_SUCCESS, 
    ADD_USER_FAIL, 
    SELECT_USER,
    UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, FETCH_USER_FAIL,
    FETCH_USER_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_USER_FIELD_CHANGE,
    CURRENT_USER_FIELD_CHANGE_END, 
    USER_SEARCH_BEGIN,
    USER_SEARCH_SUCCESS,
    SET_USER_INFO_LOCAL,
    LOGOUT_CURRENT_USER
} from "../actions/UserActions";

export default (state = {}, action) => {
switch(action.type) {
   case ADD_USER_SUCCESS:
   {
       return {
            ...state,
            error: null,
            current_user: { 
                id: 0,
                user_meta: { 
                    emailId: '',
                    role: 'guest'
                }
            },
            snack_open: true,
            success_message: 'User added successfully'
       }
   }
   case UPDATE_USER_FAIL:
   case ADD_USER_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case SELECT_USER:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           editMode: true,
           current_USER: action.payload
       }
   }
   case UPDATE_USER_SUCCESS:
   {
       return {
           ...state,
           editMode: false,
           current_user: { 
                id: 0,
                user_meta: { 
                    emailId: '',
                    role: 'guest'
                }
           },
           snack_open: true,
           success_message: 'User Updated Successfully'
       }
   }
   case CURRENT_USER_FIELD_CHANGE:
   {
       
       return {
           ...state,
           field_updated: true,
           current_user: action.payload
       }
   }
   case CURRENT_USER_FIELD_CHANGE_END:
   {
       return {
           ...state,
           field_updated: false
       }
   }
   case FETCH_USER_SUCCESS:
   {
       
       return {
           ...state,
           error: null,
           editMode: false,
           current_user: {
               id: 0,
               user_meta: { 
                emailId: '',
                role: 'guest'
               }
           },
           success_message: '',
           search_enabled: false,
           users: action.payload
       }
   }
   case USER_SEARCH_BEGIN:
   {
       return {
           ...state,
           search_enabled: !state.search_enabled,
           search_term: '',
           filteredCandidates: state.contactnoList
       }
   }
   case USER_SEARCH_SUCCESS:
   {   
       return {
           ...state,
           search_term: action.payload.searchTerm,
           filteredCandidates: action.payload.filteredCandidates
       }
   }
   case FETCH_USER_FAIL:
   {
       return {
           ...state,
           current_USER: { 
                fullName:'',
                email:'',
                contactno: '',
                experienceYears: 0,
                experienceMonths: 10
            },
           error: action.payload
       }
   }
   case SET_USER_INFO_LOCAL:
   {
       return {
           ...state,
           currentUserLocal: action.payload,
           isTokenExpired: false
       }
   }
   case LOGOUT_CURRENT_USER:
   {
       return {
           ...state,
           currentUserLocal: null,
           isTokenExpired: true
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