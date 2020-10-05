"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var queries = {
    getAllInvitationsQuery: function getAllInvitationsQuery() {
        return "\n            SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', \n            JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', \n            JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', \n            JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', \n            JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', \n            JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', \n            JSON_EXTRACT(r.response_meta, '$.result') as 'result', \n            JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', \n            t.id as 'testId', r.id as 'responseId' \n            FROM ta_invitations i \n            join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n            join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n            left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n        ";
    },

    getInvitationsByOrgQuery: function getInvitationsByOrgQuery(orgId) {
        return "\n                SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', \n                JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', \n                JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', \n                JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', \n                JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', \n                JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', \n                JSON_EXTRACT(r.response_meta, '$.result') as 'result', \n                JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', \n                t.id as 'testId', r.id as 'responseId' \n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id\n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n            ";
    },

    getCandidateInfoByInvitationId: function getCandidateInfoByInvitationId(invitationId) {
        return "\n            SELECT i.id AS 'invitationId',\n            c.id AS 'candidateId',\n            JSON_EXTRACT(c.candidate_meta, '$.name') AS 'candidateName',\n            JSON_EXTRACT(c.candidate_meta, '$.email') AS 'candidateEmail'\n            FROM ta_invitations i\n            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta,'$.candidateId')=c.id\n            WHERE i.id = " + invitationId + "\n        ";
    },

    getUserByEmailIdQuery: function getUserByEmailIdQuery(emailId) {
        return "\n            SELECT u.id as 'id', \n            JSON_EXTRACT(u.user_meta, '$') as 'user_meta'\n            FROM ta_users u \n            WHERE JSON_EXTRACT(u.user_meta, '$.emailId') = '" + emailId + "'\n        ";
    },

    getMcqResponseByInvitationId: function getMcqResponseByInvitationId(invitationId) {
        return "\n            SELECT r.id as 'id',\n            JSON_EXTRACT(r.response_meta, '$') as 'response_meta'\n            FROM ta_mcqresponses r\n            WHERE JSON_EXTRACT(r.response_meta, '$.invitationId') = " + invitationId + "\n        ";
    },

    getAllDbConfig: function getAllDbConfig() {
        return "\n            SELECT meta_key, meta_value\n            FROM ta_config\n        ";
    },

    getCandidatesByTestId: function getCandidatesByTestId(testId) {
        return "\n            SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', \n            JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', \n            JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', \n            JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', \n            JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', \n            JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', \n            JSON_EXTRACT(r.response_meta, '$.result') as 'result', \n            JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', \n            t.id as 'testId', r.id as 'responseId' \n            FROM ta_invitations i \n            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n            JOIN ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n            LEFT JOIN ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n            WHERE t.id = " + testId + "\n        ";
    }
};
exports.default = queries;
//# sourceMappingURL=queries.js.map