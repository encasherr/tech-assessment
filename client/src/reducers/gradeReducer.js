import { 
    ADD_GRADE_SUCCESS, ADD_GRADE_FAIL,
    UPDATE_GRADE_SUCCESS, UPDATE_GRADE_FAIL,
    FETCH_GRADES_SUCCESS, 
    FETCH_GRADES_FAIL,
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_GRADE_FIELD_CHANGE,
    SELECT_CURRENT_GRADE,
    CURRENT_SUBJECT_CHANGE
} from "../actions/GradeActions";


export default (state = {}, action) => {
switch(action.type) {
   case ADD_GRADE_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_grade: {id: 0, grade_meta: {name:'', subjects:[]}},
           success_message: 'Grade added successfully'
       }
   }
   case ADD_GRADE_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case CURRENT_GRADE_FIELD_CHANGE:
   {       
       return {
           ...state,
           field_updated: true,
           current_grade: action.payload,
           current_subject: {},
       }
   }
   case CURRENT_SUBJECT_CHANGE:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           current_subject: action.payload
       }
   }
   case SELECT_CURRENT_GRADE:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           current_grade: action.payload,
           current_subject: {},
       }
   }
   case FETCH_GRADES_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_grade: {id: 0, grade_meta: {name:'', subjects:[]}},
           current_subject: {},
           success_message: '',
           classList: action.payload
       }
   }
   case FETCH_GRADES_FAIL:
   {
        return {
           ...state,
           current_class: {name:''},
           error: action.payload
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