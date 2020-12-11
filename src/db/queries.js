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
                t.id as 'testId', r.id as 'responseId',
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

    getInvitationCountForAdmin: () => {
        return `
                SELECT COUNT(*) as cnt
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
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

    getMcqCountForAdmin: () => {
        return `
            SELECT COUNT(*) as cnt
            FROM ta_mcq
        `;
    },
    
    getMcqCountByOrgId: (orgId) => {
        return `
            SELECT COUNT(*) as cnt
            FROM ta_mcq m
            join ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id 
            WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
        `;
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

    getCandidatesByTestId: (testId) => {
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
            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
            JOIN ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
            LEFT JOIN ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
            WHERE t.id = ${testId}
            ORDER BY i.time_stamp DESC
        `;
    }
}
export default queries;


