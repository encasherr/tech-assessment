import TestRegistrationModel from "../../Models/OnlinePortal/TestRegistrationModel";

class TestRegistrationController {

    Add = (req, resp) => {
        let model = new TestRegistrationModel();
        model.Add();
    }
}
export default new TestRegistrationController();

