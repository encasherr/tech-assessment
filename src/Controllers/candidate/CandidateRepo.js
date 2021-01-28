
import CandidateModel from '../../Models/CandidateModel';
import InvitationModel from '../../Models/InvitationModel';
import McqModel from '../../Models/McqModel';
import McqResponseModel from '../../Models/McqResponseModel';
import { EmailConfig, Constants } from '../../commons/ServerConfig';

const createNewMcqResponseMeta = async (testEntity, invitationEntity) => {
    let mcqModel = new McqModel();

    let selectedMcqIds = [];
    console.log(`testEntity: ${testEntity.test_meta}`);
    testEntity.test_meta.selectedMcqs.map((item, index) => {
        selectedMcqIds.push(item.mcqId);
    });
    let mcqResponseMeta = {
        testId: testEntity.id,
        invitationId: invitationEntity.id,
        duration: testEntity.test_meta.duration,
        mcqs: []
    };
    let mcqs = await mcqModel.GetMcqsByIds(selectedMcqIds);
    // .then((mcqs) => {
        console.log(`fetched mcqs by id, length: ${mcqs.length}`);

        testEntity.test_meta.selectedMcqs.map((item, index) => {
            console.log('mcqs filtering', mcqs.length);
            let filteredMcq = mcqs.filter((mcqItem, index) => {
                return mcqItem.id === item.mcqId;
            });
            if (filteredMcq && filteredMcq.length > 0) {
                // console.log('adding mcq to response object');
                let item_value = filteredMcq[0];
                item.mcq = item_value;
                item.candidateResponse = {
                    responseKeys: []
                }
                mcqResponseMeta.mcqs.push(item);
            }
        });
    // });
    console.log('mcqs added to response', mcqResponseMeta.mcqs.length);
    return mcqResponseMeta;
}

const startNewTest = async (invitationEntity, mcqResponseMeta) => {
    let mcqResponseModel = new McqResponseModel();
    let invitationId = invitationEntity.id;

    let mcqResponseEntity = {
        invitationId: parseInt(invitationId),
        response_meta: mcqResponseMeta
    }
    console.log('adding new mcq invitation on invitationId: ', invitationId);
    let responseId = await mcqResponseModel.Add(mcqResponseEntity);
    console.log('responseId', responseId);
    if (responseId > 0) {
        await updateInvitaionStatus(invitationEntity, Constants.InvitationTestStatus.Started);
        let mcqResponse = {
            id: responseId,
            response_meta: mcqResponseMeta
        }
        return mcqResponse;
        // resp.status(200).json(mcqResponse);
    }
    else {
        console.log('Nothing inserted as response to table');
        return null;
        // resp.status(500).json({ message: 'Error in loading response' });
    }
}

const updateInvitaionStatus = async (invitationEntity, status) => {
    let updateInvitationEntity = {
        ...invitationEntity,
        status: status
    }
    let invitationModel = new InvitationModel();
    await invitationModel.Update(updateInvitationEntity);
}

export default {
    createNewMcqResponseMeta,
    startNewTest
}