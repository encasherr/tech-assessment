const { default: Evaluator } = require("../../commons/Evaluator");
const { getCurrentDateTime } = require("../../commons/HelperFunctions");
const { default: McqModel } = require("../../Models/McqModel");
const { default: McqResponseModel } = require("../../Models/McqResponseModel");
const { default: TestRegistrationModel } = require("../../Models/OnlinePortal/TestRegistrationModel");

const evaluateInvitedTestResults = async (invitationId) => {
    let mcqResponseModel = new McqResponseModel();
    let mcqResponseEntity = await mcqResponseModel.GetByInvitationId(invitationId);
    if(mcqResponseEntity) {
        let evaluator = new Evaluator();
        let evaluatedMcqResponse = await evaluator.Evaluate(mcqResponseEntity)
        let updatedEntity = await mcqResponseModel.Update(evaluatedMcqResponse); 
        return updatedEntity;
    }
    return null;
}

const evaluateRegisteredTestResults = async (userEntity, registrationId) => {
    let testRegistrationModel = new TestRegistrationModel();
    let res = await testRegistrationModel.GetRegistrationById(userEntity, registrationId);
    let registrationEntity = res[0];
    let responseMeta = registrationEntity.response_meta;
    if(registrationEntity) {
        let dbMcqs = await getDbMcqs(responseMeta);
        let evaluator = new Evaluator();
        let evaluatedMcqResponse = await evaluator.EvaluateRegisteredTestResponse(responseMeta.mcqs, dbMcqs);
        registrationEntity.evaluation_meta = evaluatedMcqResponse;
        registrationEntity.modified_on = getCurrentDateTime();
        await testRegistrationModel.Update(registrationEntity); 
        let resNew = await testRegistrationModel.GetRegistrationById(userEntity, registrationId);
        return resNew[0];
    }
    return null;
}

const getDbMcqs = async (responseMeta) => {
    let mcqModel = new McqModel();
    let mcqIds = [];
    //console.log('responseMeta.mcqs', responseMeta.mcqs);
    responseMeta.mcqs.forEach((item) => {
        mcqIds.push(item.mcqId);
    })
    //console.log('mcqIds', mcqIds);
    let dbMcqs = await mcqModel.GetMcqsByMcqIds(mcqIds);
    return dbMcqs;
}

module.exports = {
    evaluateInvitedTestResults,
    evaluateRegisteredTestResults
}