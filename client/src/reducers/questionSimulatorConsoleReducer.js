import { LOAD_EXAM_SIMULATOR_SUCCESS, GO_TO_NEXT,
            GO_TO_PREVIOUS, CANDIDATE_RESPONSE_CHANGED,
            SUBMIT_ANSWERS_SUCCESS,
            SET_CANDIDATE_INFO } from '../actions/QuestionSimulatorConsoleActions';

export default (state = {}, action) => {
    switch(action.type) {
        case SET_CANDIDATE_INFO:
        {
            return {
                ...state,
                candidateInfo: action.payload
            }
        }
       case LOAD_EXAM_SIMULATOR_SUCCESS:
       {
           let testObject = action.payload;
           return {
               ...state,
               candidateTestObject: testObject,
               currentQuestion: (testObject && testObject.response_meta &&
                                 testObject.response_meta.mcqs &&
                                 testObject.response_meta.mcqs.length > 0) ?
                                 testObject.response_meta.mcqs[0] : {}
           }
       }
       case CANDIDATE_RESPONSE_CHANGED: 
       {
           let currentQuestion = action.payload;
           return {
               ...state,
               currentQuestion: currentQuestion
           }
       }
       case SUBMIT_ANSWERS_SUCCESS:
       {
           return {
               ...state,
               candidateTestObject: null,
               status: action.payload
           }
       }
       case GO_TO_PREVIOUS:
       {
           return {
               ...state,
               currentQuestion: action.payload
           }
       }
       case GO_TO_NEXT:
       {
           return {
               ...state,
               currentQuestion: action.payload
           }
       }
       default: {
           return state;
       }    
    }
}