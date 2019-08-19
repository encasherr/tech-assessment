import { LOAD_EXAM_SIMULATOR_SUCCESS } from '../actions/QuestionSimulatorConsoleActions';

export default (state = {}, action) => {
    switch(action.type) {
       case LOAD_EXAM_SIMULATOR_SUCCESS:
       {
           console.log('LOAD_EXAM_SIMULATOR_SUCCESS reducer');
           return {
               ...state,
               candidateTestObject: action.payload
           }
       }
       default: {
           return state;
       }    
    }
}