"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Constants = require("../commons/Constants");

var _Constants2 = _interopRequireDefault(_Constants);

var _RoleDefinitions = require("../commons/RoleDefinitions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = {
    getAllInvitationsQuery: function getAllInvitationsQuery() {
        return "\n                SELECT \n                /*JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , invitationId)) as 'respInvitationId', r.**/\n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n                i.time_stamp as 'invitedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n                (r.candidate_score/r.total_score)*100 as 'scorePercentage', \n                r.result as 'result', \n                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n                t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',\n                r.response_meta as 'response_meta'\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id \n                join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id \n                left join ta_mcqresponses r ON r.invitationId = i.id\n                /*left join ta_mcqresponses r ON JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , '$.invitationId')) = i.id*/\n                /*where r.id in (47, 50)*/\n                where i.isLive=1\n                order by i.time_stamp DESC\n        ";
    },

    getCandidatesByTestId: function getCandidatesByTestId(testId) {
        return "\n            SELECT \n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n            i.time_stamp as 'invitedOn', \n            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', \n            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', \n            JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n            t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',\n            r.response_meta as 'response_meta'\n            FROM ta_invitations i \n            join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id \n            join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id \n            left join ta_mcqresponses r ON r.invitationId = i.id\n            where i.isLive=1\n            and t.id = " + testId + "\n            order by i.time_stamp DESC\n        ";
    },

    getStudentsByTestId: function getStudentsByTestId(testId) {
        return "\n            SELECT \n            JSON_UNQUOTE(JSON_EXTRACT(ca.candidate_meta, '$.name')) as 'candidateName', \n            JSON_UNQUOTE(JSON_EXTRACT(ca.candidate_meta, '$.email')) as 'candidateEmail', \n            tr.status as 'invitationStatus', \n            tr.created_on as 'invitedOn', \n            CASE tr.status WHEN 'Completed' THEN tr.modified_on ELSE NULL END as 'completedOn', \n            JSON_UNQUOTE(JSON_EXTRACT(tr.evaluation_meta, '$.scorePercentage')) as 'scorePercentage', \n            JSON_UNQUOTE(JSON_EXTRACT(tr.evaluation_meta, '$.result')) as 'result', \n            JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n            t.id as 'testId', tr.id as 'registrationId', ca.id as 'candidateId',\n            tr.response_meta as 'response_meta'\n            FROM ta_test_registrations tr \n            join ta_candidates ca ON tr.candidate_id = ca.id \n            join ta_tests t ON tr.test_id = t.id\n            where t.id = " + testId + "\n            order by tr.created_on DESC\n        ";
    },

    getInvitationCountForAdmin: function getInvitationCountForAdmin() {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n            ";
    },

    getInvitationCountForUser: function getInvitationCountForUser(userId) {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE u.id = " + userId + " \n            ";
    },

    getInvitationCountByOrgId: function getInvitationCountByOrgId(orgId) {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id \n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE (JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n                OR JSON_EXTRACT(u.user_meta, '$.role') = '" + _RoleDefinitions.admin + "')\n                AND i.isLive = 1\n            ";
    },

    getInvitationsByOrgQuery: function getInvitationsByOrgQuery(orgId) {
        return "\n                SELECT\n                c.id as 'candidateId', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n                i.time_stamp as 'invitedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n                (r.candidate_score/r.total_score)*100 as 'scorePercentage', \n                r.result as 'result', \n                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n                t.id as 'testId', r.id as 'responseId' \n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id\n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n                order by i.time_stamp DESC\n            ";
    },

    getInvitationsByCreateUserQuery: function getInvitationsByCreateUserQuery(userId) {
        return "\n                SELECT \n                c.id as 'candidateId',\n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', \n                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', \n                i.time_stamp as 'invitedOn', \n                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', \n                (r.candidate_score/r.total_score)*100 as 'scorePercentage', \n                r.result as 'result',  \n                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', \n                t.id as 'testId', r.id as 'responseId' \n                FROM ta_invitations i \n                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id \n                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id\n                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id \n                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id\n                WHERE u.id = " + userId + "\n                order by i.time_stamp DESC\n            ";
    },

    getTestCountForAdmin: function getTestCountForAdmin() {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_tests t\n            ";
    },

    getTestCountByOrgId: function getTestCountByOrgId(orgId) {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_tests t\n                join ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id \n                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n            ";
    },

    getTestCountByUser: function getTestCountByUser(userId) {
        return "\n                SELECT COUNT(*) as cnt\n                FROM ta_tests t\n                join ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id \n                WHERE u.id = " + userId + "\n            ";
    },

    getMcqCountForAdmin: function getMcqCountForAdmin() {
        return "\n            SELECT COUNT(*) as cnt\n            FROM ta_mcq\n        ";
    },

    getMcqCountByUser: function getMcqCountByUser(userId) {
        return "\n            SELECT COUNT(*) as cnt\n            FROM ta_mcq m\n            join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id \n            WHERE u.id = " + userId + "\n        ";
    },

    getMcqCountByOrgId: function getMcqCountByOrgId(orgId) {
        // return `
        //     SELECT COUNT(*) as cnt
        //     FROM ta_mcq m
        //     join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id 
        //     WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
        // `;
        return "SELECT count(*) as cnt \n            FROM ta_mcq m \n            JOIN ta_users u ON m.addedBy = u.id\n            WHERE (JSON_EXTRACT(u.user_meta, '$.orgId') = " + orgId + "\n                OR JSON_EXTRACT(u.user_meta, '$.role') = '" + _RoleDefinitions.admin + "')\n                AND m.category in ('Programming', 'Aptitude')";
    },

    getCandidateInfoByInvitationId: function getCandidateInfoByInvitationId(invitationId) {
        return "\n            SELECT i.id AS 'invitationId',\n            c.id AS 'candidateId',\n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) AS 'candidateName',\n            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) AS 'candidateEmail'\n            FROM ta_invitations i\n            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta,'$.candidateId')=c.id\n            WHERE i.id = " + invitationId + "\n        ";
    },

    getCandidateByEmailQuery: function getCandidateByEmailQuery(emailId) {
        return "\n            SELECT *\n            FROM ta_candidates c\n            WHERE JSON_EXTRACT(c.candidate_meta, '$.email') = '" + emailId + "'\n        ";
    },

    getUserByEmailIdQuery: function getUserByEmailIdQuery(emailId) {
        return "\n            SELECT u.id as 'id', \n            JSON_EXTRACT(u.user_meta, '$') as 'user_meta'\n            FROM ta_users u \n            WHERE JSON_EXTRACT(u.user_meta, '$.emailId') = '" + emailId + "'\n        ";
    },

    checkUserCredentials: function checkUserCredentials(emailId) {
        return "\n            SELECT u.id as 'id', \n            JSON_EXTRACT(u.user_meta, '$') as 'user_meta',\n            emailId,\n            password,\n            verificationStatus\n            FROM ta_users u \n            WHERE emailId = '" + emailId + "'\n        ";
    },

    getMcqResponseByInvitationId: function getMcqResponseByInvitationId(invitationId) {
        return "\n            SELECT r.id as 'id',\n            r.response_meta as 'response_meta'\n            FROM ta_mcqresponses r\n            WHERE JSON_EXTRACT(r.response_meta, '$.invitationId') = " + invitationId + "\n        ";
    },

    getMcqResponseByResponseId: function getMcqResponseByResponseId(responseId) {
        return "\n            SELECT  r.id,\n                    r.invitationId,\n                    r.response_meta,\n                    i.invitation_meta\n            FROM ta_mcqresponses r\n            JOIN ta_invitations i on r.invitationId = i.id\n            WHERE r.id = " + responseId + "\n        ";
    },

    getMcqResponseByRegistrationId: function getMcqResponseByRegistrationId(registrationId) {
        return "\n            SELECT  tr.id,\n                    tr.response_meta,\n                    tr.evaluation_meta\n            FROM ta_test_registrations tr\n            WHERE tr.id = " + registrationId + "\n        ";
    },

    getRecentRegistrationIdOfCandidate: function getRecentRegistrationIdOfCandidate(candidateId) {
        return "\n            SELECT  tr.id\n            FROM ta_test_registrations tr\n            WHERE candidate_id = " + candidateId + "\n            ORDER BY tr.created_on DESC\n        ";
    },

    getMcqResponsesPendingForEvaluation: function getMcqResponsesPendingForEvaluation() {
        return "\n                SELECT  r.id,\n                        r.invitationId as invitationId,\n                        r.response_meta,\n                        i.invitation_meta\n                FROM ta_mcqresponses r\n                JOIN ta_invitations i on r.invitationId = i.id\n                WHERE JSON_EXTRACT(i.invitation_meta, '$.status') = '" + _Constants2.default.InvitationTestStatus.Completed + "'\n                AND r.evaluation_status = 'PENDING'\n                AND r.invitationId = 175\n            ";
    },

    getAllDbConfig: function getAllDbConfig() {
        return "\n            SELECT meta_key, meta_value\n            FROM ta_config\n        ";
    },

    getDbConfigByKey: function getDbConfigByKey(key) {
        return "\n            SELECT meta_key, meta_value\n            FROM ta_config\n            WHERE meta_key='" + key + "'\n        ";
    },

    getCandidateDetails: function getCandidateDetails(candidateId) {
        return "\n            SELECT c.candidate_meta,\n            i.invitation_meta,\n            t.test_meta,\n            r.response_meta,\n            c.skills,\n            c.grade,\n            c.user_id\n            FROM ta_candidates c\n            JOIN ta_invitations i on JSON_EXTRACT(i.invitation_meta, '$.candidateId') = c.id\n            JOIN ta_tests t on JSON_EXTRACT(i.invitation_meta, '$.testId') = t.id\n            LEFT JOIN ta_mcqresponses r on i.id = r.invitationId\n            WHERE c.id= " + candidateId + "\n            AND i.isLive = 1\n        ";
    },

    getRegisteredCandidateDetails: function getRegisteredCandidateDetails(candidateId) {
        return "\n            SELECT c.candidate_meta,\n            tr.response_meta,\n            tr.evaluation_meta,\n            tr.status,\n            tr.modified_on,\n            tr.created_on,\n            t.test_meta,\n            c.skills,\n            c.grade,\n            c.user_id\n            FROM ta_candidates c\n            JOIN ta_test_registrations tr on c.id = tr.candidate_id\n            JOIN ta_tests t on tr.test_id = t.id\n            WHERE c.id= " + candidateId + "\n        ";
    },

    getAllRegistrationsQuery: function getAllRegistrationsQuery(filter) {
        var sql = "SELECT *\n            FROM ta_test_registrations tr JOIN ta_tests ts ON tr.test_id = ts.id \n            ";
        if (filter) {
            sql += " WHERE " + filter;
        }
        return sql;
    },

    getAllRegistrationsForUserQuery: function getAllRegistrationsForUserQuery(userId, filter) {
        var sql = "SELECT \n            tr.id as registrationId,\n            tr.evaluation_meta as evaluation_meta,\n            tr.status as status,\n            tr.scheduled_start as scheduled_start,\n            tr.modified_on as modified_on,\n            JSON_UNQUOTE(JSON_EXTRACT(ts.test_meta, '$.testName')) as testName,\n            ts.test_meta as test_meta,\n            ts.grade,\n            ts.subject\n            FROM ta_test_registrations tr \n            JOIN ta_tests ts ON tr.test_id = ts.id\n            JOIN ta_candidates ca on tr.candidate_id = ca.id\n            JOIN ta_users u on ca.user_id = u.id \n            WHERE u.id = " + userId + "\n            ";
        if (filter) {
            sql += " AND " + filter;
        }
        return sql;
    },

    getAllRegistrationsForTestIdQuery: function getAllRegistrationsForTestIdQuery(testId, filter) {
        var sql = "SELECT *\n            FROM ta_test_registrations tr JOIN ta_tests ts ON tr.test_id = ts.id \n            WHERE test_id = " + testId + "\n            ";
        if (filter) {
            sql += " AND " + filter;
        }
        return sql;
    },

    getAllRegistrationsForAuthorQuery: function getAllRegistrationsForAuthorQuery(userId, filter) {
        var sql = "SELECT *\n            FROM ta_test_registrations tr JOIN ta_tests ts ON tr.test_id = ts.id \n            WHERE JSON_EXTRACT(ts.test_meta, '$.createdBy') = " + userId + "\n            ";
        if (filter) {
            sql += " AND " + filter;
        }
        return sql;
    },

    getAllTestsForGrade: function getAllTestsForGrade(grade, filter) {
        var sql = "SELECT *\n            FROM ta_tests\n            WHERE grade = '" + grade + "'\n            ";
        if (filter) {
            sql += " AND " + filter;
        }
        return sql;
    }
};
exports.default = queries;
//# sourceMappingURL=queries.js.map