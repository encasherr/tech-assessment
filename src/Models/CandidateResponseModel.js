import db from '../db/mysqldb';
import queries from '../db/queries';
import McqModel from './McqModel';

class CandidateResponseModel {

    GetCandidateResponse = (responseId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getMcqResponseByResponseId(responseId);
            db.executeQuery(sql)
            .then(async (res) => {
                resolve(await this.mapCandidateResponse(res[0]));
            }).catch((err) => {
                reject(err);
            })
        })
    }

    GetRegisteredCandidateResponse = (registrationId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getMcqResponseByRegistrationId(registrationId);
            db.executeQuery(sql)
            .then(async (res) => {
                resolve(await this.mapCandidateResponse(res[0]));
            }).catch((err) => {
                reject(err);
            })
        })
    }

    GetRecentRegistrationIdOfCandidate = (candidateId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getRecentRegistrationIdOfCandidate(candidateId);
            db.executeQuery(sql).then((res) => {
                resolve(res[0]);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    mapCandidateResponse = async (data) => {
        let output = {};
        let response_meta = data.response_meta;
        if(response_meta) {
            response_meta = response_meta.replace(/\n/g, "\\n");
            response_meta = response_meta.replace(/\r/g, "\\r");
            response_meta = response_meta.replace(/\t/g, "\\t");
            output['response_meta'] = JSON.parse(response_meta);
            let mcqs = output['response_meta'].mcqs;
            if(mcqs && mcqs.length > 0) {
                let mcqCorrectAnswers = [];
                let mcqIds = [];
                mcqs.map((mcqItem) => {
                    mcqIds.push(mcqItem.mcq.id);
                })
                if(mcqIds.length > 0) {
                    let mcqModel = new McqModel();
                    let mcqItems = await mcqModel.GetMcqsByMcqIds(mcqIds);
                    mcqItems.forEach((mcqItem) => {
                        let mcqCorrectAnswerItem = { mcqId: mcqItem.id };
                        let correctChoices = '';
                        mcqItem.mcq_meta.choices.forEach((choiceItem) => {
                            correctChoices += choiceItem.isCorrect ? choiceItem.key : '';
                        });
                        mcqCorrectAnswerItem.correctAnswer = correctChoices;
                        mcqCorrectAnswers.push(mcqCorrectAnswerItem);
                    })
                }
                output['mcqCorrectAnswers'] = mcqCorrectAnswers;
            }
        }
        let evaluation_meta = data.evaluation_meta;
        if(evaluation_meta) {
            evaluation_meta = evaluation_meta.replace(/\n/g, "\\n");
            evaluation_meta = evaluation_meta.replace(/\r/g, "\\r");
            evaluation_meta = evaluation_meta.replace(/\t/g, "\\t");
            output['evaluation_meta'] = JSON.parse(evaluation_meta);
        }
        Object.keys(data).forEach((prop) => {
            if(prop.indexOf('_meta') === -1) {
                output[prop] = data[prop];
            }
        })
        output['isRegistered'] = !!data['user_id'];

        return output;
    }

    GetCandidateDetails = (candidateId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getCandidateDetails(candidateId);
            db.executeQuery(sql).then((res) => {
                resolve(this.mapCandidateDetails(res));
            }).catch((err) => {
                reject(err);
            })
        })
    }

    GetRegisteredCandidateDetails = (candidateId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getRegisteredCandidateDetails(candidateId);
            db.executeQuery(sql).then((res) => {
                resolve(this.mapCandidateDetails(res));
            }).catch((err) => {
                reject(err);
            })
        })
    }
    
    mapCandidateDetails = (data) => {
        let outputArray = [];
        if(data && data.length > 0) {
            data.forEach((item) => {

                let output = {};
                let candidate_meta = item.candidate_meta;
                if(candidate_meta) {
                    candidate_meta = candidate_meta.replace(/\n/g, "\\n");
                    candidate_meta = candidate_meta.replace(/\r/g, "\\r");
                    candidate_meta = candidate_meta.replace(/\t/g, "\\t");
                    output['candidate_meta'] = JSON.parse(candidate_meta);
                }
                let invitation_meta = item.invitation_meta;
                if(invitation_meta) {
                    invitation_meta = invitation_meta.replace(/\n/g, "\\n");
                    invitation_meta = invitation_meta.replace(/\r/g, "\\r");
                    invitation_meta = invitation_meta.replace(/\t/g, "\\t");
                    output['invitation_meta'] = JSON.parse(invitation_meta);
                }
                let test_meta = item.test_meta;
                if(test_meta) {
                    test_meta = test_meta.replace(/\n/g, "\\n");
                    test_meta = test_meta.replace(/\r/g, "\\r");
                    test_meta = test_meta.replace(/\t/g, "\\t");
                    output['test_meta'] = JSON.parse(test_meta);
                }
                let response_meta = item.response_meta;
                if(response_meta) {
                    response_meta = response_meta.replace(/\n/g, "\\n");
                    response_meta = response_meta.replace(/\r/g, "\\r");
                    response_meta = response_meta.replace(/\t/g, "\\t");
                    output['response_meta'] = JSON.parse(response_meta);
                }
                let evaluation_meta = item.evaluation_meta;
                if(evaluation_meta) {
                    evaluation_meta = evaluation_meta.replace(/\n/g, "\\n");
                    evaluation_meta = evaluation_meta.replace(/\r/g, "\\r");
                    evaluation_meta = evaluation_meta.replace(/\t/g, "\\t");
                    output['evaluation_meta'] = JSON.parse(evaluation_meta);
                }
                Object.keys(item).forEach((prop) => {
                    if(prop.indexOf('_meta') === -1) {
                        output[prop] = item[prop];
                    }
                })
                output['isRegistered'] = !!item['user_id'];
                outputArray.push(output);
            })
        }

        return outputArray;
    }

}
export default CandidateResponseModel;