import db from '../../db';
import userModel from '../../users';
import BaseController from '../BaseController';
import CandidateResponseModel from '../../Models/CandidateResponseModel';
import CandidateModel from '../../Models/CandidateModel';

class CandidateResponseController extends BaseController {

    /*GetCandidateResponse = (req, resp) => {
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
    }*/

    GetCandidateResponse = async (req, resp) => {
        let model = new CandidateResponseModel();
        console.log('req.query', req.query);
        let { candidateId, responseId } = req.query;

        if(!candidateId) {
            let msg = 'candidate id is required';
            console.log(msg);
            resp.status(500).send(msg);
            return;
        }

        let candidateModel = new CandidateModel();
        let candidateEntity = await candidateModel.GetCandidate(candidateId);
        if(!candidateEntity) {
            let msg = 'candidate not found';
            console.log(msg);
            resp.status(404).send(msg);
            return;
        }
        console.log('candEntity', candidateEntity);
        console.log('!!candidateEntity.user_id', !!candidateEntity.user_id);
        let isRegistered = !!candidateEntity.user_id;

        if(isRegistered) {
            let registration = await model.GetRecentRegistrationIdOfCandidate(candidateId);
            if(registration) {
                model.GetRegisteredCandidateResponse(registration.id)
                    .then((res) => {
                        console.log('registered candidate details fetched');
                        resp.status(200).json(res);
                    })
                    .catch((error) => {
                        let msg = "Error in fetching registered candidate details: " + error;
                        console.log(msg);
                        resp.status(500).send(msg);
                    });
            }
        }
        else {
            if(!responseId) {
                let msg = 'response id is required';
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
    }

    GetCandidateDetails = async (req, resp) => {
        let model = new CandidateResponseModel();
        console.log('req.query', req.query);
        let { candidateId } = req.query;

        if(!candidateId) {
            let msg = 'candidate id is required';
            console.log(msg);
            resp.status(500).send(msg);
            return;
        }

        let candidateModel = new CandidateModel();
        let candidateEntity = await candidateModel.GetCandidate(candidateId);
        if(!candidateEntity) {
            let msg = 'candidate not found';
            console.log(msg);
            resp.status(404).send(msg);
            return;
        }
        console.log('candEntity', candidateEntity);
        console.log('!!candidateEntity.user_id', !!candidateEntity.user_id);
        let isRegistered = !!candidateEntity.user_id;

        if(isRegistered) {
            model.GetRegisteredCandidateDetails(candidateId)
                .then((res) => {
                    console.log('registered candidate details fetched');
                    resp.status(200).json(res);
                })
                .catch((error) => {
                    let msg = "Error in fetching registered candidate details: " + error;
                    console.log(msg);
                    resp.status(500).send(msg);
                });
        }
        else {
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

}
export default new CandidateResponseController();
