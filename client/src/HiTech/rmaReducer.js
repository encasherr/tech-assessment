import { ADD_RMAREQUESTS_SUCCESS, ADD_RMAREQUESTS_FAIL, SELECT_CATEGORY,
    UPDATE_RMAREQUESTS_SUCCESS, UPDATE_RMAREQUESTS_FAIL,
    FETCH_RMAREQUESTS_SUCCESS, 
    FETCH_RMAREQUESTS_FAIL,
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR, 
    CURRENT_RMAREQUESTS_FIELD_CHANGE,
    CURRENT_RMAREQUESTS_FIELD_CHANGE_END, 
    INITIALIZE_RMA_FIELDS
    } from '../HiTech/RmaRequestActions'

const initial_state = {
    customerDetails: {},
    productList: [],
    current_product: {},
    vendorDetails: {},

}

export default (state = {}, action) => {
switch(action.type) {
    case INITIALIZE_RMA_FIELDS:
    {
        return {
            current_rma_request: initial_state
        }
    }
   case ADD_RMAREQUESTS_SUCCESS:
   {
       return {
           ...state,
           error: null,
           current_rma_request: {},
           success_message: 'RMA Request submitted successfully'
       }
   }
   case UPDATE_RMAREQUESTS_FAIL:
   case ADD_RMAREQUESTS_FAIL:
   {
       return {
           ...state,
           error: action.payload
       }
   }
   case UPDATE_RMAREQUESTS_SUCCESS:
   {
       return {
           ...state,
           success_message: 'Category Updated Successfully'
       }
   }
   case CURRENT_RMAREQUESTS_FIELD_CHANGE:
   {
       console.log('rma field change reducer');
       console.log(action.payload);
       
       return {
           ...state,
           field_updated: true,
           current_rma_request: action.payload
       }
   }
   case FETCH_RMAREQUESTS_SUCCESS:
   {
       console.log('fetch rma requests reducer');
       console.log(action.payload);
       
       return {
           ...state,
           error: null,
           success_message: '',
           rmaRequestList: action.payload
       }
   }
   case FETCH_RMAREQUESTS_FAIL:
   {
       return {
           ...state,
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