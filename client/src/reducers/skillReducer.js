import { ADD_SKILL_SUCCESS, ADD_SKILL_FAIL,
    FETCH_SKILLS_SUCCESS, 
    FETCH_SKILLS_FAIL,
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_SKILL_FIELD_CHANGE,
    CURRENT_SKILL_FIELD_CHANGE_END, 
    SKILL_SEARCH_BEGIN,
    SKILL_SEARCH_SUCCESS} from "../actions/SkillActions";


export default (state = {}, action) => {
switch(action.type) {
   case ADD_SKILL_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_skill: {skill:''},
           success_message: 'Skill added successfully'
       }
   }
   case ADD_SKILL_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case CURRENT_SKILL_FIELD_CHANGE:
   {       
       return {
           ...state,
           field_updated: true,
           current_skill: action.payload
       }
   }
   case CURRENT_SKILL_FIELD_CHANGE_END:
   {
       return {
           ...state,
           field_updated: false
       }
   }
   case FETCH_SKILLS_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_skill: {id: 0, skill_meta: {skill:''}},
           editMode: false,
           success_message: '',
           search_enabled: false,
           skillList: action.payload
       }
   }
   case SKILL_SEARCH_BEGIN:
   {
       return {
           ...state,
           search_enabled: !state.search_enabled,
           search_term: '',
           filteredSkills: state.skillList
       }
   }
   case SKILL_SEARCH_SUCCESS:
   {   
       return {
           ...state,
           search_term: action.payload.searchTerm,
           filteredSkills: action.payload.filteredSkills
       }
   }
   case FETCH_SKILLS_FAIL:
   {
        return {
           ...state,
           current_skill: {skill:''},
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