import { getCurrentDateTime } from './HelperFunctions';
import { Constants } from './ServerConfig';

class Evaluator {
    
    Evaluate = (responseEntity) => {
        return new Promise((resolve, reject) => {
            try {
         
                let evaluationResults = [];
                if(responseEntity && 
                    responseEntity.response_meta.mcqs && 
                    responseEntity.response_meta.mcqs.length > 0) {
                    
                    let candidateScore = 0;
                    let totalScore = 0;
        
                    responseEntity.response_meta.mcqs.map((mcqItem, index) => {
                        mcqItem.isCorrect = true;
                        let correctAnswerKeys = [];
                        mcqItem.mcq.mcq_meta.choices.map((choiceItem, idx) => {
                            if(choiceItem.isCorrect) {
                                correctAnswerKeys.push(choiceItem.key);
                            }
                        });
                        let candidateResponseKeys = mcqItem.candidateResponse.responseKeys;
                        for(var i = 0; i < correctAnswerKeys.length; i++) {
                            if(candidateResponseKeys.indexOf(correctAnswerKeys[i]) < 0) {
                                mcqItem.isCorrect = false;
                                break;
                            }
                        }
                        if(mcqItem.isCorrect) {
                            candidateScore += 0 + this.parseScore(mcqItem.mcq.mcq_meta.score);
                        }
                        totalScore += 0 + this.parseScore(mcqItem.mcq.mcq_meta.score);
                        console.log('totalScore', totalScore);
                    });
                    
                    let passingPercentage = Constants.PassingPercentage;
                    let scorePercentage = (candidateScore / totalScore) * 100;
                    let result = scorePercentage >= passingPercentage ?
                                                        'CLEARED' :
                                                        'FAILED';
                    responseEntity.response_meta.totalScore = totalScore;
                    responseEntity.response_meta.candidateScore = candidateScore;
                    responseEntity.response_meta.scorePercentage = scorePercentage;
                    responseEntity.response_meta.result = result;

                    responseEntity.total_score = totalScore;
                    responseEntity.candidate_score = candidateScore;
                    responseEntity.result = result;                                                                
                    responseEntity.evaluation_status = 'COMPLETED';
        
                }
                
                resolve(responseEntity);

            } catch (error) {
                reject(error);
            }
        });
    }

    EvaluateRegisteredTestResponse = (responseMcqs, dbMcqs) => {
        let correctChoices = [];
        let responseChoices = [];
        dbMcqs.map((mcqItem) => {
            let correctKeys = '';
            mcqItem.mcq_meta.choices.map((choiceItem) => {
                if(choiceItem.isCorrect) {
                    correctKeys += choiceItem.key;
                }
            })
            correctChoices.push({
                mcqId: mcqItem.id,
                choice: correctKeys,
                mcqScore: !mcqItem.mcq_meta.score ? 10 : mcqItem.mcq_meta.score
            })
        })
        responseMcqs.map((mcqItem) => {
            let correctKeys = '';
            mcqItem.candidateResponse.responseKeys.map((responseKey) => {
                correctKeys += responseKey;
            })
            responseChoices.push({
                mcqId: mcqItem.mcqId,
                choice: correctKeys,
                responseKeys: mcqItem.candidateResponse.responseKeys
            })
        })

        let evaluationResult = {
            totalScore: 0,
            candidateScore: 0,
            scorePercentage: 0,
            result: ''
        };
        responseChoices.forEach((responseChoice) => {
            let matchingChoice = correctChoices.filter((item) => {
                return item.mcqId === responseChoice.mcqId;
            })
            let res = {
                mcqId: responseChoice.mcqId,
                responseKeys: responseChoice.responseKeys,
            }
            if(matchingChoice && matchingChoice.length > 0) {
                let correctChoice = matchingChoice[0];
                res.isCorrect = responseChoice.choice === correctChoice.choice;
                evaluationResult.candidateScore += res.isCorrect ?  correctChoice.mcqScore : 0;
                evaluationResult.totalScore +=  correctChoice.mcqScore;
            }
            else {
                res.isCorrect = false;
            }
        });
        
        let passingPercentage = Constants.PassingPercentage;
        evaluationResult.completedOn = getCurrentDateTime();
        evaluationResult.scorePercentage = (evaluationResult.candidateScore / evaluationResult.totalScore) * 100;
        evaluationResult.result = evaluationResult.scorePercentage >= passingPercentage ?
                                                    'CLEARED' :
                                                    'FAILED';
        return evaluationResult;
    }

    parseScore = (stringValue) => {
        if(isNaN(stringValue)){
            return Constants.DefaultScore;
        }
        return parseInt(stringValue);
    }

}

export default Evaluator;