import { 
    FETCH_TEST_SUCCESS, 
    OPEN_SNACKBAR, 
    CLOSE_SNACKBAR,
    PUBLISH_TEST_SUCCESS
} from "../actions/TestConsoleActions";
import { ADD_QUESTION_TO_TEST } from "../actions/TestConsoleActions";
import { stat } from "fs";

export default (state = {}, action) => {
switch(action.type) {
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
   case ADD_QUESTION_TO_TEST:
   {
       let mcqToAdd = action.payload;
    //    if(!state.current_test.selectedMcqs){
    //     state.current_test.selectedMcqs = [];
    //    }
    //    console.log('test console add mcq to test reducer');
    //    let mcqList = state.current_test.selectedMcqs;
    //    let filterIndex = state.current_test.selectedMcqs.findIndex(item => item.$loki === mcqToAdd.$loki);
    //    if(filterIndex !== undefined && filterIndex > -1) {
    //         mcqList.splice(filterIndex, 1);
    //         mcqToAdd.selected = false;
    //    }
    //    else {
    //        console.log('mcq added in reducer');
    //         mcqToAdd.selected = true;
    //         mcqList.push(mcqToAdd);
    //    }
    //    console.log(state.current_test.selectedMcqs);
    //    console.log(mcqList);
       return {
            ...state,
            mcqAdded: !state.mcqAdded,
            current_test: action.payload
            // current_test: {
            //     ...state.current_test,
            //     selectedMcqs: mcqList
            // }
        }
   }
//    case PUBLISH_TEST_SUCCESS: {
//        return {
//            ...state,
//            m
//        }
//    }
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