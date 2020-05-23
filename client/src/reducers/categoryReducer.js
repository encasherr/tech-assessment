import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAIL, SELECT_CATEGORY,
         UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL,
         FETCH_CATEGORIES_SUCCESS, 
         FETCH_CATEGORIES_FAIL,
         OPEN_SNACKBAR, 
         CLOSE_SNACKBAR, 
         CURRENT_CATEGORY_FIELD_CHANGE,
         CURRENT_CATEGORY_FIELD_CHANGE_END, 
         CATEGORY_SEARCH_BEGIN,
         CATEGORY_SEARCH_SUCCESS} from "../actions/CategoryActions";

const initial_current_Category = {
    id: 0, category_meta: {title:'',description:''}
}

export default (state = {}, action) => {
    switch(action.type) {
        case ADD_CATEGORY_SUCCESS:
        {
            return {
                ...state,
                error: null,
                current_category: {title:'',description:''},
                success_message: 'Category added successfully'
            }
        }
        case UPDATE_CATEGORY_FAIL:
        case ADD_CATEGORY_FAIL:
        {
            return {
                ...state,
                error: action.payload
            }
        }
        case SELECT_CATEGORY:
        {
            return {
                ...state,
                field_updated: !state.field_updated,
                editMode: true,
                current_category: action.payload
            }
        }
        case UPDATE_CATEGORY_SUCCESS:
        {
            return {
                ...state,
                editMode: false,
                current_category: {title:'',description:''},
                success_message: 'Category Updated Successfully'
            }
        }
        case CURRENT_CATEGORY_FIELD_CHANGE:
        {
            
            return {
                ...state,
                field_updated: true,
                current_category: action.payload
            }
        }
        case CURRENT_CATEGORY_FIELD_CHANGE_END:
        {
            return {
                ...state,
                field_updated: false
            }
        }
        case FETCH_CATEGORIES_SUCCESS:
        {
            return {
                ...state,
                error: null,
                editMode: false,
                current_category: {id: 0, category_meta: {title:'',description:''}},
                success_message: '',
                search_enabled: false,
                categoryList: action.payload
            }
        }
        case CATEGORY_SEARCH_BEGIN:
        {
            return {
                ...state,
                search_enabled: !state.search_enabled,
                search_term: '',
                filteredCategories: state.categoryList
            }
        }
        case CATEGORY_SEARCH_SUCCESS:
        {   
            return {
                ...state,
                search_term: action.payload.searchTerm,
                filteredCategories: action.payload.filteredCategories
            }
        }
        case FETCH_CATEGORIES_FAIL:
        {
            return {
                ...state,
                current_category: initial_current_Category,
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