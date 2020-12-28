import db from '../../db';
import userModel from '../../users';
import BaseController from '../BaseController';
import CandidateResponseModel from '../../Models/CandidateResponseModel';

class CandidateResponseController extends BaseController {

    GetCandidateResponse = (req, resp) => {
        let model = new CandidateResponseModel();
        console.log('req.query', req.query);
        let { responseId } = req.query;

        if(!responseId) {
            let msg = 'responseId is required';
            console.log(msg);
            resp.status(500).send(msg);
            return;
        }

        model.GetCandidateResponse(responseId)
            .then((res) => {
                console.log('candidate response fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching candidate response: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    GetCandidateDetails = (req, resp) => {
        let model = new CandidateResponseModel();
        console.log('req.query', req.query);
        let { candidateId } = req.query;

        if(!candidateId) {
            let msg = 'candidateId is required';
            console.log(msg);
            resp.status(500).send(msg);
            return;
        }

        model.GetCandidateDetails(candidateId)
            .then((res) => {
                console.log('candidate details fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching candidate details: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

}
export default new CandidateResponseController();
