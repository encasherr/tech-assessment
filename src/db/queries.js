import { admin } from "../commons/RoleDefinitions";

const queries =  {
    getAllInvitationsQuery: () => {
        return `
                SELECT 
                /*JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , invitationId)) as 'respInvitationId', r.**/
                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', 
                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', 
                i.time_stamp as 'invitedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', 
                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', 
                t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',
                r.response_meta as 'response_meta'
                FROM ta_invitations i 
                join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id 
                join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id 
                left join ta_mcqresponses r ON r.invitationId = i.id
                /*left join ta_mcqresponses r ON JSON_UNQUOTE(JSON_EXTRACT(r.response_meta , '$.invitationId')) = i.id*/
                /*where r.id in (47, 50)*/
                where i.isLive=1
                order by i.time_stamp DESC
        `;
    },

    getCandidatesByTestId: (testId) => {
        return `
            SELECT 
            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', 
            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', 
            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', 
            i.time_stamp as 'invitedOn', 
            JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', 
            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', 
            JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', 
            JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', 
            t.id as 'testId', r.id as 'responseId', c.id as 'candidateId',
            r.response_meta as 'response_meta'
            FROM ta_invitations i 
            join ta_candidates c ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.candidateId')) = c.id 
            join ta_tests t ON JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta , '$.testId')) = t.id 
            left join ta_mcqresponses r ON r.invitationId = i.id
            where i.isLive=1
            and t.id = ${testId}
            order by i.time_stamp DESC
        `;
    },

    getInvitationCountForAdmin: () => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
            `;
    },

    getInvitationCountForUser: (userId) => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
                WHERE u.id = ${userId} 
            `;
    },

    getInvitationCountByOrgId: (orgId) => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
                WHERE (JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
                OR JSON_EXTRACT(u.user_meta, '$.role') = '${admin}')
                AND i.isLive = 1
            `;
    },

    getInvitationsByOrgQuery: (orgId) => {
        return `
                SELECT JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', 
                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', 
                i.time_stamp as 'invitedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', 
                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', 
                t.id as 'testId', r.id as 'responseId' 
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id
                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
                order by i.time_stamp DESC
            `;
    },

    getInvitationsByCreateUserQuery: (userId) => {
        return `
                SELECT 
                c.id as 'candidateId',
                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) as 'candidateName', 
                JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) as 'candidateEmail', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.status')) as 'invitationStatus', 
                i.time_stamp as 'invitedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(i.invitation_meta, '$.completedOn')) as 'completedOn', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.scorePercentage')) as 'scorePercentage', 
                JSON_UNQUOTE(JSON_EXTRACT(r.response_meta, '$.result')) as 'result', 
                JSON_UNQUOTE(JSON_EXTRACT(t.test_meta, '$.testName')) as 'testName', 
                t.id as 'testId', r.id as 'responseId' 
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id
                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
                WHERE u.id = ${userId}
                order by i.time_stamp DESC
            `;
    },

    getTestCountForAdmin: () => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_tests t
            `;
    },

    getTestCountByOrgId: (orgId) => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_tests t
                join ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id 
                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
            `;
    },

    getTestCountByUser: (userId) => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_tests t
                join ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id 
                WHERE u.id = ${userId}
            `;
    },

    getMcqCountForAdmin: () => {
        return `
            SELECT COUNT(*) as cnt
            FROM ta_mcq
        `;
    },

    getMcqCountByUser: (userId) => {
        return `
            SELECT COUNT(*) as cnt
            FROM ta_mcq m
            join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id 
            WHERE u.id = ${userId}
        `;
    },
    
    getMcqCountByOrgId: (orgId) => {
        // return `
        //     SELECT COUNT(*) as cnt
        //     FROM ta_mcq m
        //     join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id 
        //     WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
        // `;
        return `SELECT count(*) as cnt 
            FROM ta_mcq m 
            JOIN ta_users u ON m.addedBy = u.id
            WHERE (JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
                OR JSON_EXTRACT(u.user_meta, '$.role') = '${admin}')
                AND m.category in ('Programming', 'Aptitude')`
    },

    getCandidateInfoByInvitationId: (invitationId) => {
    return `
            SELECT i.id AS 'invitationId',
            c.id AS 'candidateId',
            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.name')) AS 'candidateName',
            JSON_UNQUOTE(JSON_EXTRACT(c.candidate_meta, '$.email')) AS 'candidateEmail'
            FROM ta_invitations i
            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta,'$.candidateId')=c.id
            WHERE i.id = ${invitationId}
        `;
    },

    getCandidateByEmailQuery: (emailId) => {
        return `
            SELECT *
            FROM ta_candidates c
            WHERE JSON_EXTRACT(c.candidate_meta, '$.email') = '${emailId}'
        `;
    },

    getUserByEmailIdQuery: (emailId) => {
        return `
            SELECT u.id as 'id', 
            JSON_EXTRACT(u.user_meta, '$') as 'user_meta'
            FROM ta_users u 
            WHERE JSON_EXTRACT(u.user_meta, '$.emailId') = '${emailId}'
        `;
    },

    getMcqResponseByInvitationId: (invitationId) => {
        return `
            SELECT r.id as 'id',
            r.response_meta as 'response_meta'
            FROM ta_mcqresponses r
            WHERE JSON_EXTRACT(r.response_meta, '$.invitationId') = ${invitationId}
        `;
    },

    getMcqResponseByResponseId: (responseId) => {
        return `
            SELECT  r.id,
                    r.invitationId,
                    r.response_meta,
                    i.invitation_meta
            FROM ta_mcqresponses r
            JOIN ta_invitations i on r.invitationId = i.id
            WHERE r.id = ${responseId}
        `;
    },

    getAllDbConfig: () => {
        return `
            SELECT meta_key, meta_value
            FROM ta_config
        `;
    },

    getDbConfigByKey: (key) => {
        return `
            SELECT meta_key, meta_value
            FROM ta_config
            WHERE meta_key='${key}'
        `;
    },

    getCandidateDetails: (candidateId) => {
        return `
            SELECT c.candidate_meta,
            i.invitation_meta,
            t.test_meta,
            r.response_meta
            FROM ta_candidates c
            JOIN ta_invitations i on JSON_EXTRACT(i.invitation_meta, '$.candidateId') = c.id
            JOIN ta_tests t on JSON_EXTRACT(i.invitation_meta, '$.testId') = t.id
            LEFT JOIN ta_mcqresponses r on i.id = r.invitationId
            WHERE c.id= ${candidateId}
            AND i.isLive = 1
        `;
    },

    getAllRegistrationsQuery: () => {
        return `
        
        `;
    },

    getAllRegistrationsQuery: (orgId) => {
        return `
        
        `;
    }
}
export default queries;


