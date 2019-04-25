import { ADD_CANDIDATE_SUCCESS, ADD_CANDIDATE_FAIL, SELECT_CANDIDATE,
    UPDATE_CANDIDATE_SUCCESS, UPDATE_CANDIDATE_FAIL, FETCH_CANDIDATE_FAIL,
    FETCH_CANDIDATE_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_CANDIDATE_FIELD_CHANGE,
    CURRENT_CANDIDATE_FIELD_CHANGE_END, 
    CANDIDATE_SEARCH_BEGIN,
    CANDIDATE_SEARCH_SUCCESS
} from "../actions/McqActions";
import { FETCH_SKILLS_SUCCESS } from "../actions/SkillActions";

export default (state = {}, action) => {
switch(action.type) {
   case ADD_CANDIDATE_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_candidate: { 
               fullName:'',
               email:'',
               contactno: '',
               experienceYears: 0,
               experienceMonths: 10
            },
           success_message: 'CANDIDATE added successfully'
       }
   }
   case UPDATE_CANDIDATE_FAIL:
   case ADD_CANDIDATE_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case SELECT_CANDIDATE:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           editMode: true,
           current_CANDIDATE: action.payload
       }
   }
   case UPDATE_CANDIDATE_SUCCESS:
   {
       return {
           ...state,
           editMode: false,
           current_candidate: { 
                fullName:'',
                email:'',
                contactno: '',
                skill: '',
                experienceYears: 0,
                experienceMonths: 10
           },
           success_message: 'CANDIDATE Updated Successfully'
       }
   }
   case CURRENT_CANDIDATE_FIELD_CHANGE:
   {
       console.log('field change reducer');
       console.log(action.payload);
       
       return {
           ...state,
           field_updated: true,
           current_candidate: action.payload
       }
   }
   case CURRENT_CANDIDATE_FIELD_CHANGE_END:
   {
       return {
           ...state,
           field_updated: false
       }
   }
   case CURRENT_ANSWER_FIELD_CHANGE:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           currentAnswer: action.payload
       }
   }
   case FETCH_CANDIDATE_SUCCESS:
   {
       console.log('fetch mcq reducer');
       console.log(action.payload);
       
       return {
           ...state,
           error: null,
           editMode: false,
           current_candidate: { 
                fullName:'',
                email:'',
                contactno: '',
                experienceYears: 0,
                experienceMonths: 10
           },
           success_message: '',
           search_enabled: false,
           mcqs: action.payload
       }
   }
   case FETCH_SKILLS_SUCCESS:
   {
        console.log('fetch skills reducer');
        console.log(action.payload);
        
        return {
            ...state,
            skills: action.payload
        }
   }
   case CANDIDATE_SEARCH_BEGIN:
   {
       return {
           ...state,
           search_enabled: !state.search_enabled,
           search_term: '',
           filteredCandidates: state.contactnoList
       }
   }
   case CANDIDATE_SEARCH_SUCCESS:
   {   
       return {
           ...state,
           search_term: action.payload.searchTerm,
           filteredCandidates: action.payload.filteredCandidates
       }
   }
   case FETCH_CANDIDATE_FAIL:
   {
       return {
           ...state,
           current_candidate: { 
                fullName:'',
                email:'',
                contactno: '',
                experienceYears: 0,
                experienceMonths: 10
            },
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