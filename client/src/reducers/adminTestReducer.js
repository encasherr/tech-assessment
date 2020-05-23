import { ADD_TEST_SUCCESS, ADD_TEST_FAIL, SELECT_TEST,
    UPDATE_TEST_SUCCESS, UPDATE_TEST_FAIL, FETCH_TESTS_FAIL,
    FETCH_TESTS_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_TEST_FIELD_CHANGE,
    CURRENT_TEST_FIELD_CHANGE_END, 
    TEST_SEARCH_BEGIN,
    TEST_SEARCH_SUCCESS,
    CHOICE_ADDED_TO_TEST, 
    CURRENT_ANSWER_FIELD_CHANGE
} from "../actions/AdminTestActions";
import { FETCH_CATEGORIES_SUCCESS } from '../actions/CategoryActions'; 
import { FETCH_SKILLS_SUCCESS } from "../actions/SkillActions";

export default (state = {}, action) => {
switch(action.type) {
   case ADD_TEST_SUCCESS:
   {
       return {
            ...state,
            error: null,
            current_test: { 
                id: 0,
                test_meta: {
                skill:'',
                testName:'',
                duration: 90,
                experienceYears: 5,
                status: 'draft',
                search_enabled: !state.search_enabled,
                }
            },
            success_message: 'Test added successfully',
            snack_open: true
        }
   }
   case UPDATE_TEST_FAIL:
   case ADD_TEST_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case SELECT_TEST:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           editMode: true,
           current_TEST: action.payload
       }
   }
   case UPDATE_TEST_SUCCESS:
   {
       return {
           ...state,
           editMode: false,
           current_mcq: { 
                question:'',
                description:'',
                category: '',
                skill: '',
                minimumExperience: 0,
                maximumExperience: 10,
                choices: []
           },
           success_message: 'TEST Updated Successfully'
       }
   }
   case CURRENT_TEST_FIELD_CHANGE:
   {
       
       return {
           ...state,
           field_updated: true,
           current_mcq: action.payload
       }
   }
   case CURRENT_TEST_FIELD_CHANGE_END:
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
   case FETCH_TESTS_SUCCESS:
   {
       let arr = [];
       if(action.payload && action.payload.length > 0) {
           action.payload.map((item, index) => {
               arr.push(item);
           })
       }
       return {
           ...state,
           error: null,
           editMode: !state.editMode,
           current_test: { 
               id: 0,
               test_meta: {
                skill:'',
                testName:'',
                duration: 90,
                experienceYears: 5,
                status: 'draft',
                search_enabled: !state.search_enabled,
               }
            },
           success_message: '',
           search_enabled: !state.search_enabled,
           tests: arr
       }
   }
   case FETCH_SKILLS_SUCCESS:
   {
        
        return {
            ...state,
            skills: action.payload
        }
   }
   case FETCH_CATEGORIES_SUCCESS:
   {
       
       return {
           ...state,
           error: null,
           current_test: {
               id: 0,
               test_meta: { 
                question:'',
                description:'',
                category: '',
                skill: '',
                choices: []
               }
           },
           currentAnswer: {
                content: '',
                isCorrect: false
           },
           success_message: '',
           search_enabled: false,
           categories: action.payload
       }
   }
   case CHOICE_ADDED_TO_TEST: 
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           current_mcq: action.payload,
           currentAnswer: {
               content: '',
               isCorrect: false
           }
       }
   }
   case TEST_SEARCH_BEGIN:
   {
       return {
           ...state,
           search_enabled: !state.search_enabled,
           search_term: '',
           filteredCategories: state.categoryList
       }
   }
   case TEST_SEARCH_SUCCESS:
   {   
       return {
           ...state,
           search_term: action.payload.searchTerm,
           filteredCategories: action.payload.filteredCategories
       }
   }
   case FETCH_TESTS_FAIL:
   {
        let payload = action.payload;
        if(payload && payload.errorStatus === '401') {
            return {
                ...state,
                tests: [],
                skills: [],
                state_changed: !state.state_changed,
                error: payload
            }
        }
       return {
           ...state,
           current_mcq: { 
                question:'',
                description:'',
                category: '',
                skill: '',
                answerId: 0,
                choices: []
            },
           error: null
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