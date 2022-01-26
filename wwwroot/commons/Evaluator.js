'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _HelperFunctions = require('./HelperFunctions');

var _ServerConfig = require('./ServerConfig');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evaluator = function Evaluator() {
    var _this = this;

    _classCallCheck(this, Evaluator);

    this.Evaluate = function (responseEntity) {
        return new Promise(function (resolve, reject) {
            try {

                var evaluationResults = [];
                if (responseEntity && responseEntity.response_meta.mcqs && responseEntity.response_meta.mcqs.length > 0) {

                    var candidateScore = 0;
                    var totalScore = 0;

                    responseEntity.response_meta.mcqs.map(function (mcqItem, index) {
                        mcqItem.isCorrect = true;
                        var correctAnswerKeys = [];
                        mcqItem.mcq.mcq_meta.choices.map(function (choiceItem, idx) {
                            if (choiceItem.isCorrect) {
                                correctAnswerKeys.push(choiceItem.key);
                            }
                        });
                        var candidateResponseKeys = mcqItem.candidateResponse.responseKeys;
                        for (var i = 0; i < correctAnswerKeys.length; i++) {
                            if (candidateResponseKeys.indexOf(correctAnswerKeys[i]) < 0) {
                                mcqItem.isCorrect = false;
                                break;
                            }
                        }
                        if (mcqItem.isCorrect) {
                            candidateScore += 0 + _this.parseScore(mcqItem.mcq.mcq_meta.score);
                        }
                        totalScore += 0 + _this.parseScore(mcqItem.mcq.mcq_meta.score);
                        console.log('totalScore', totalScore);
                    });

                    var passingPercentage = _ServerConfig.Constants.PassingPercentage;
                    var scorePercentage = candidateScore / totalScore * 100;
                    var result = scorePercentage >= passingPercentage ? 'CLEARED' : 'FAILED';
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
    };

    this.EvaluateRegisteredTestResponse = function (responseMcqs, dbMcqs) {
        var correctChoices = [];
        var responseChoices = [];
        dbMcqs.map(function (mcqItem) {
            var correctKeys = '';
            mcqItem.mcq_meta.choices.map(function (choiceItem) {
                if (choiceItem.isCorrect) {
                    correctKeys += choiceItem.key;
                }
            });
            correctChoices.push({
                mcqId: mcqItem.id,
                choice: correctKeys,
                mcqScore: !mcqItem.mcq_meta.score ? 10 : mcqItem.mcq_meta.score
            });
        });
        responseMcqs.map(function (mcqItem) {
            var correctKeys = '';
            mcqItem.candidateResponse.responseKeys.map(function (responseKey) {
                correctKeys += responseKey;
            });
            responseChoices.push({
                mcqId: mcqItem.mcqId,
                choice: correctKeys,
                responseKeys: mcqItem.candidateResponse.responseKeys
            });
        });

        var evaluationResult = {
            totalScore: 0,
            candidateScore: 0,
            scorePercentage: 0,
            result: ''
        };
        responseChoices.forEach(function (responseChoice) {
            var matchingChoice = correctChoices.filter(function (item) {
                return item.mcqId === responseChoice.mcqId;
            });
            var res = {
                mcqId: responseChoice.mcqId,
                responseKeys: responseChoice.responseKeys
            };
            if (matchingChoice && matchingChoice.length > 0) {
                var correctChoice = matchingChoice[0];
                res.isCorrect = responseChoice.choice === correctChoice.choice;
                evaluationResult.candidateScore += res.isCorrect ? correctChoice.mcqScore : 0;
                evaluationResult.totalScore += correctChoice.mcqScore;
            } else {
                res.isCorrect = false;
            }
        });

        var passingPercentage = _ServerConfig.Constants.PassingPercentage;
        evaluationResult.completedOn = (0, _HelperFunctions.getCurrentDateTime)();
        evaluationResult.scorePercentage = evaluationResult.candidateScore / evaluationResult.totalScore * 100;
        evaluationResult.result = evaluationResult.scorePercentage >= passingPercentage ? 'CLEARED' : 'FAILED';
        return evaluationResult;
    };

    this.parseScore = function (stringValue) {
        if (isNaN(stringValue)) {
            return _ServerConfig.Constants.DefaultScore;
        }
        return parseInt(stringValue);
    };
};

exports.default = Evaluator;
//# sourceMappingURL=Evaluator.js.map