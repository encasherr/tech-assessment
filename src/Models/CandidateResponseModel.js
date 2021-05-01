import db from '../db/mysqldb';
import queries from '../db/queries';

class CandidateResponseModel {

    GetCandidateResponse = (responseId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getMcqResponseByResponseId(responseId);
            db.executeQuery(sql).then((res) => {
                resolve(this.mapCandidateResponse(res[0]));
            }).catch((err) => {
                reject(err);
            })
        })
    }

    mapCandidateResponse = (data) => {
        let response_meta = data.response_meta;
        response_meta = response_meta.replace(/\n/g, "\\n");
        response_meta = response_meta.replace(/\r/g, "\\r");
        response_meta = response_meta.replace(/\t/g, "\\t");
        let invitation_meta = data.invitation_meta;
        invitation_meta = invitation_meta.replace(/\n/g, "\\n");
        invitation_meta = invitation_meta.replace(/\r/g, "\\r");
        invitation_meta = invitation_meta.replace(/\t/g, "\\t");
        let output = {};
        output['response_meta'] = JSON.parse(response_meta);
        output['invitation_meta'] = JSON.parse(invitation_meta);
        output.mcqs = response_meta.mcqs;
        output.invitationId = response_meta.invitationId;

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

    
    mapCandidateDetails = (data) => {
        let outputArray = [];
        if(data && data.length > 0) {
            data.forEach((item) => {

                let candidate_meta = item.candidate_meta;
                if(candidate_meta) {
                    candidate_meta = candidate_meta.replace(/\n/g, "\\n");
                    candidate_meta = candidate_meta.replace(/\r/g, "\\r");
                    candidate_meta = candidate_meta.replace(/\t/g, "\\t");
                }
                let invitation_meta = item.invitation_meta;
                if(invitation_meta) {
                    invitation_meta = invitation_meta.replace(/\n/g, "\\n");
                    invitation_meta = invitation_meta.replace(/\r/g, "\\r");
                    invitation_meta = invitation_meta.replace(/\t/g, "\\t");
                }
                let test_meta = item.test_meta;
                if(test_meta) {
                    test_meta = test_meta.replace(/\n/g, "\\n");
                    test_meta = test_meta.replace(/\r/g, "\\r");
                    test_meta = test_meta.replace(/\t/g, "\\t");
                }
                let response_meta = item.response_meta;
                if(response_meta) {
                    response_meta = response_meta.replace(/\n/g, "\\n");
                    response_meta = response_meta.replace(/\r/g, "\\r");
                    response_meta = response_meta.replace(/\t/g, "\\t");
                }
                
                let output = {};
                output['candidate_meta'] = JSON.parse(candidate_meta);
                output['invitation_meta'] = JSON.parse(invitation_meta);
                output['test_meta'] = JSON.parse(test_meta);
                output['response_meta'] = JSON.parse(response_meta);
                
                outputArray.push(output);
            })
        }

        return outputArray;
    }

}
export default CandidateResponseModel;