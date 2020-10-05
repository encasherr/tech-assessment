'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
                    responseEntity.response_meta.totalScore = totalScore;
                    responseEntity.response_meta.candidateScore = candidateScore;
                    responseEntity.response_meta.scorePercentage = candidateScore / totalScore * 100;
                    responseEntity.response_meta.result = responseEntity.response_meta.scorePercentage >= passingPercentage ? 'CLEARED' : 'FAILED';
                }

                resolve(responseEntity);
            } catch (error) {
                reject(error);
            }
        });
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