import { getCurrentDateTime } from "../../commons/HelperFunctions";
import { Constants } from "../../commons/ServerConfig";
import CandidateModel from "../../Models/CandidateModel";
import TestRegistrationModel from "../../Models/OnlinePortal/TestRegistrationModel";
import TestModel from "../../Models/TestModel";
import mcqResponseRepo from './McqResponseRepo';

class TestRegistrationController {

    RegisterForTest = async (req, resp) => {
        let model = new TestRegistrationModel();
        let candidateModel = new CandidateModel();
        let candidateEntity = await candidateModel.GetCandidateByEmail(req.user.emailId);
        console.log('candidateEntity found', candidateEntity);
        let { testId, scheduledStart } = req.body;
        let registrationEntity = { 
            test_id: testId, 
            candidate_id: candidateEntity[0].id, 
            status: 'Registered',
            response_meta: await model.CreateResponse(req.user, testId),
            scheduled_start: scheduledStart,
            created_on: getCurrentDateTime(),
            modified_on: getCurrentDateTime()
        };
        model.Add(registrationEntity)
            .then((res) => {
                if(res) {
                    console.log('registration entry added');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in add registration entry: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    StartRegisteredTest = async (req, resp) => {
        let model = new TestRegistrationModel();
        let { registrationId } = req.body;
        let registrationEntity = await model.GetRegistrationById(req.user, registrationId);
        registrationEntity[0].status = 'InProgress';
        registrationEntity.modified_on = getCurrentDateTime();
        model.Update(registrationEntity[0])
            .then((res) => {
                if(res) {
                    console.log('registration status updated to inprogress');
                    resp.status(200).send(JSON.stringify(res));
                }  
            })
            .catch((error) => {
                let msg = "Error in updating registration to inprogress: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    SubmitRegisteredTest = async (req, resp) => {
        let model = new TestRegistrationModel();
        let registrationEntity = req.body;
        registrationEntity.status = 'Completed';
        registrationEntity.modified_on = getCurrentDateTime();
        await model.Update(registrationEntity);
        await mcqResponseRepo.evaluateRegisteredTestResults(req.user, registrationEntity.id);
        console.log('response submitted and evaluated');
        resp.status(200).json({ message: Constants.CandidateThanksMessage });
    }

    GetAllRegistrations = (req, resp) => {
        let model = new TestRegistrationModel();
        model.GetAllRegistrations(req.user)
            .then((res) => {
                console.log('all registrations retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch all registrations: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }

    GetMyRegistrations = (req, resp) => {
        let model = new TestRegistrationModel();
        model.GetAllMyTestRegistrations(req.user)
            .then((res) => {
                console.log('my registrations retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch my registrations: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }

    GetRegistrationsForTest = (req, resp) => {
        let { testId } = req.body;
        let model = new TestRegistrationModel();
        model.GetRegistrationsForTest(req.user, testId)
            .then((res) => {
                console.log('registrations for test retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch registrations for test: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }

    GetAllTestsForGrade = (req, resp) => {
        let { grade } = req.body;
        let model = new TestModel();
        model.GetTestsForGrade(req.user, grade)
            .then((res) => {
                console.log('grade tests retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch grade tests: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }
}
export default new TestRegistrationController();

