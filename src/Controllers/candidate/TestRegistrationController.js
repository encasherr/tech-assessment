import { getCurrentDateTime } from "../../commons/HelperFunctions";
import TestRegistrationModel from "../../Models/OnlinePortal/TestRegistrationModel";
import TestModel from "../../Models/TestModel";

class TestRegistrationController {

    RegisterForTest = (req, resp) => {
        let model = new TestRegistrationModel();
        let { test_id, candidate_id } = req.body;
        let registrationEntity = { 
            test_id, 
            candidate_id, 
            status: 'Registered',
            response_meta: model.CreateResponse(test_id),
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

    StartTest = (req, resp) => {
        
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
                console.log('my registrations retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch my registrations: " + error;
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

