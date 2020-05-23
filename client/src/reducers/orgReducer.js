import { ADD_ORG_SUCCESS, ADD_ORG_FAIL, SELECT_ORG,
    UPDATE_ORG_SUCCESS, UPDATE_ORG_FAIL,
    FETCH_ORGS_SUCCESS, 
    FETCH_ORGS_FAIL,
    CURRENT_ORG_FIELD_CHANGE,
    CURRENT_ORG_FIELD_CHANGE_END, 
} from "../actions/OrgActions";

const initial_current_org = {
id: 0, org_meta: {name:'',city:''}
}

export default (state = {}, action) => {
switch(action.type) {
   case ADD_ORG_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_org: {name:'',city:''},
           success_message: 'Org added successfully'
       }
   }
   case UPDATE_ORG_FAIL:
   case ADD_ORG_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case SELECT_ORG:
   {
       return {
           ...state,
           field_updated: !state.field_updated,
           editMode: true,
           current_org: action.payload
       }
   }
   case UPDATE_ORG_SUCCESS:
   {
       return {
           ...state,
           editMode: false,
           current_org: {name:'',city:''},
           success_message: 'Org Updated Successfully'
       }
   }
   case CURRENT_ORG_FIELD_CHANGE:
   {
       return {
           ...state,
           field_updated: true,
           current_org: action.payload
       }
   }
   case CURRENT_ORG_FIELD_CHANGE_END:
   {
       return {
           ...state,
           field_updated: false
       }
   }
   case FETCH_ORGS_SUCCESS:
   {
       return {
           ...state,
           error: null,
           editMode: false,
           current_org: {id: 0, org_meta: {name:'',city:''}},
           success_message: '',
           search_enabled: false,
           orgList: action.payload
       }
   }
   case FETCH_ORGS_FAIL:
   {
       return {
           ...state,
           current_org: initial_current_org,
           error: action.payload
       }
   }
   default: {
       return state;
   }
}
}