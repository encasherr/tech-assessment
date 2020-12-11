import config from '../config';
import repository from '../repository';
import AuthHelper from '../AuthHelper';

export const LOAD_EXAM_SIMULATOR_SUCCESS = 'LOAD_EXAM_SIMULATOR_SUCCESS';
export const GO_TO_PREVIOUS = 'GO_TO_PREVIOUS';
export const GO_TO_NEXT = 'GO_TO_NEXT';
export const CANDIDATE_RESPONSE_CHANGED = 'CANDIDATE_RESPONSE_CHANGED';
export const SUBMIT_ANSWERS_SUCCESS = 'SUBMIT_ANSWERS_SUCCESS';
export const SET_CANDIDATE_INFO = 'SET_CANDIDATE_INFO';
export const INVITATION_FETCH_FAILED = 'INVITATION_FETCH_FAILED';

export const ResponseChange = (responseKey, currentQuestion, mcqList) => dispatch => {
    console.log('response changed', currentQuestion);
    let mcqsWithResponses = [];
    let mcqWithResponse = {
        mcqId: currentQuestion.id
    }
    mcqList.map((mcqItem, index) => {
        if (mcqItem.mcqId === currentQuestion.mcqId) {
            if(mcqItem.candidateResponse &&
                mcqItem.candidateResponse.responseKeys) {
                    let removeKeyIndex = mcqItem.candidateResponse.responseKeys.indexOf(responseKey);
                    if(removeKeyIndex > -1) {
                        mcqItem.candidateResponse.responseKeys.slice(removeKeyIndex, 1);
                    }
                    else {
                        mcqItem.candidateResponse.responseKeys.push(responseKey);
                    }
                    
                    dispatch({
                        type: CANDIDATE_RESPONSE_CHANGED,
                        payload: mcqItem
                    })
                }
        }
    });
}

export const GetInvitation = (invitationId) => dispatch => {
    return new Promise((resolve, reject) => {
        let url = config.instance.getCandidateApiUrl() + 'invitaion';
        let invitationModel = {
            invitationId: invitationId
        };
        repository.getData(url)
                    .then((res) => {
                        AuthHelper.Login(res);
                        let userInfo = AuthHelper.GetUserInfo();
                        dispatch({
                            type: SET_CANDIDATE_INFO,
                            payload: userInfo
                        });
                        resolve(true);
                    })
                    .catch((err) => {
                        dispatch({
                            type: INVITATION_FETCH_FAILED,
                            payload: err
                        });
                        reject(err);
                    });

    })
}

export const LoadExamSimulator = (invitationId) => dispatch => {
    let userInfo = AuthHelper.GetUserInfo();
    let url = config.instance.getCandidateApiUrl() + 'startTest';
    let invitationModel = {
        invitationId: invitationId
    };
    repository.saveData(url, invitationModel)
            .then((res) => {
                dispatch({
                    type: LOAD_EXAM_SIMULATOR_SUCCESS,
                    payload: res.data
                });
            })
}

export const GoToPrevious = (currentQuestion, mcqList) => dispatch => {
    if(mcqList && mcqList.length > 1){
        let questionOrderIndex = currentQuestion.questionOrderIndex;
        if(questionOrderIndex <= 0) return;
        let newQuestion = mcqList.find((item) => {
            return item.questionOrderIndex === questionOrderIndex - 1;
        });
        dispatch({
            type: GO_TO_PREVIOUS,
            payload: newQuestion 
        });
    }
}

export const GoToNext = (currentQuestion, mcqList) => dispatch => {
    if(mcqList && mcqList.length > 1){
        let questionOrderIndex = currentQuestion.questionOrderIndex;
        if(questionOrderIndex >= mcqList.length-1) return;
        let newQuestion = mcqList.find((item) => {
            return item.questionOrderIndex === questionOrderIndex + 1;
        });
        dispatch({
            type: GO_TO_NEXT,
            payload: newQuestion 
        });
    }
}

export const SubmitAnswers = (candidateTestObject) => dispatch => {
    let url = config.instance.getCandidateApiUrl() + 'submitAnswers';
    
    repository.saveData(url, candidateTestObject)
            .then((res) => {
                dispatch({
                    type: SUBMIT_ANSWERS_SUCCESS,
                    payload: res.data
                });
            })
            .then(() => {
                AuthHelper.LogOut();
            });
}