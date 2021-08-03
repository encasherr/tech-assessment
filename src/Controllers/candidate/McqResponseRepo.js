const { default: Evaluator } = require("../../commons/Evaluator");
const { default: McqResponseModel } = require("../../Models/McqResponseModel");

const evaluateResults = async (invitationId) => {
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

module.exports = {
    evaluateResults
}