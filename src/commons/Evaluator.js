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
                    responseEntity.response_meta.totalScore = totalScore;
                    responseEntity.response_meta.candidateScore = candidateScore;
                    responseEntity.response_meta.scorePercentage = (candidateScore / totalScore) * 100;
                    responseEntity.response_meta.result = responseEntity.response_meta.scorePercentage >= passingPercentage ?
                                                                'CLEARED' :
                                                                'FAILED';
        
                }
                
                resolve(responseEntity);

            } catch (error) {
                reject(error);
            }
        });
    }

    parseScore = (stringValue) => {
        if(isNaN(stringValue)){
            return Constants.DefaultScore;
        }
        return parseInt(stringValue);
    }

}

export default Evaluator;