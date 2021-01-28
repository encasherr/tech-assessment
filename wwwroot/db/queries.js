"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var queries = {
    getAllInvitationsQuery: function getAllInvitationsQuery() {
        return "\n                SELECT \n                /*JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , invitationId)) as 'respInvitationId', r.**/\n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n                i.time_stamp as 'invitedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', \n                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', \n                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n                t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',\n                r.response_meta as 'response_meta'\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id \n                join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id \n                left join ta_mcqresponses r ON r.invitationId = i.id\n                /*left join ta_mcqresponses r ON JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , '$.invitationId')) = i.id*/\n                /*where r.id in (47, 50)*/\n                where i.isLive=1\n                order by i.time_stamp DESC\n        ";
    },

    getCandidatesByTestId: function getCandidatesByTestId(testId) {
        return "\n            SELECT \n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n            i.time_stamp as 'invitedOn', \n            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', \n            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', \n            JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n            t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',\n            r.response_meta as 'response_meta'\n            FROM ta_invitations i \n            join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id \n            join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id \n            left join ta_mcqresponses r ON r.invitationId = i.id\n            where i.isLive=1\n            and t.id = " + testId + "\n            order by i.time_stamp DESC\n        ";
    },

    getInvitationCountForAdmin: function getInvitationCountForAdmin() {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n            ";
    },

    getInvitationsByOrgQuery: function getInvitationsByOrgQuery(orgId) {
        return "\n                SELECT JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n                i.time_stamp as 'invitedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', \n                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', \n                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n                t.id as 'testId', r.id as 'responseId' \n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id\n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n                order by i.time_stamp DESC\n            ";
    },

    getTestCountForAdmin: function getTestCountForAdmin() {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_tests t\n            ";
    },

    getTestCountByOrgId: function getTestCountByOrgId(orgId) {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_tests t\n                join ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id \n                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n            ";
    },

    getMcqCountForAdmin: function getMcqCountForAdmin() {
        return "\n            SELECT COUNT(*) as cnt\n            FROM ta_mcq\n        ";
    },

    getMcqCountByOrgId: function getMcqCountByOrgId(orgId) {
        return "\n            SELECT COUNT(*) as cnt\n            FROM ta_mcq m\n            join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id \n            WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n        ";
    },

    getCandidateInfoByInvitationId: function getCandidateInfoByInvitationId(invitationId) {
        return "\n            SELECT i.id AS 'invitationId',\n            c.id AS 'candidateId',\n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) AS 'candidateName',\n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) AS 'candidateEmail'\n            FROM ta_invitations i\n            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta,'$.candidateId')=c.id\n            WHERE i.id = " + invitationId + "\n        ";
    },

    getUserByEmailIdQuery: function getUserByEmailIdQuery(emailId) {
        return "\n            SELECT u.id as 'id', \n            JSON_EXTRACT(u.user_meta, '$') as 'user_meta'\n            FROM ta_users u \n            WHERE JSON_EXTRACT(u.user_meta, '$.emailId') = '" + emailId + "'\n        ";
    },

    getMcqResponseByInvitationId: function getMcqResponseByInvitationId(invitationId) {
        return "\n            SELECT r.id as 'id',\n            r.response_meta as 'response_meta'\n            FROM ta_mcqresponses r\n            WHERE JSON_EXTRACT(r.response_meta, '$.invitationId') = " + invitationId + "\n        ";
    },

    getMcqResponseByResponseId: function getMcqResponseByResponseId(responseId) {
        return "\n            SELECT  r.id,\n                    r.invitationId,\n                    r.response_meta,\n                    i.invitation_meta\n            FROM ta_mcqresponses r\n            JOIN ta_invitations i on r.invitationId = i.id\n            WHERE r.id = " + responseId + "\n        ";
    },

    getAllDbConfig: function getAllDbConfig() {
        return "\n            SELECT meta_key, meta_value\n            FROM ta_config\n        ";
    },

    getDbConfigByKey: function getDbConfigByKey(key) {
        return "\n            SELECT meta_key, meta_value\n            FROM ta_config\n            WHERE meta_key='" + key + "'\n        ";
    },

    getCandidateDetails: function getCandidateDetails(candidateId) {
        return "\n            SELECT c.candidate_meta,\n            i.invitation_meta,\n            t.test_meta,\n            r.response_meta\n            FROM ta_candidates c\n            JOIN ta_invitations i on JSON_EXTRACT(i.invitation_meta, '$.candidateId') = c.id\n            JOIN ta_tests t on JSON_EXTRACT(i.invitation_meta, '$.testId') = t.id\n            JOIN ta_mcqresponses r on i.id = r.id\n            WHERE c.id= " + candidateId + "\n            AND i.isLive = 1\n        ";
    }
};
exports.default = queries;
//# sourceMappingURL=queries.js.map