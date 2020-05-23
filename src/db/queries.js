const queries =  {
    getAllInvitationsQuery: () => {
    return `
            SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', 
            JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', 
            JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', 
            JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', 
            JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', 
            JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', 
            JSON_EXTRACT(r.response_meta, '$.result') as 'result', 
            JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', 
            t.id as 'testId', r.id as 'responseId' 
            FROM ta_invitations i 
            join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
            join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
            left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
        `;
    },

    getInvitationsByOrgQuery: (orgId) => {
        return `
                SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', 
                JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', 
                JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', 
                JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', 
                JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', 
                JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', 
                JSON_EXTRACT(r.response_meta, '$.result') as 'result', 
                JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', 
                t.id as 'testId', r.id as 'responseId' 
                FROM ta_invitations i 
                join ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
                join ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id
                join ta_users u ON JSON_EXTRACT(i.invitation_meta, '$.createdBy') = u.id 
                left join ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
                WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${orgId}
            `;
    },

    getCandidateInfoByInvitationId: (invitationId) => {
    return `
            SELECT i.id AS 'invitationId',
            c.id AS 'candidateId',
            JSON_EXTRACT(c.candidate_meta, '$.name') AS 'candidateName',
            JSON_EXTRACT(c.candidate_meta, '$.email') AS 'candidateEmail'
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
            JSON_EXTRACT(r.response_meta, '$') as 'response_meta'
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

    getCandidatesByTestId: (testId) => {
        return `
            SELECT JSON_EXTRACT(c.candidate_meta, '$.name') as 'candidateName', 
            JSON_EXTRACT(c.candidate_meta, '$.email') as 'candidateEmail', 
            JSON_EXTRACT(i.invitation_meta, '$.status') as 'invitationStatus', 
            JSON_EXTRACT(i.invitation_meta, '$.invitedOn') as 'invitedOn', 
            JSON_EXTRACT(i.invitation_meta, '$.completedOn') as 'completedOn', 
            JSON_EXTRACT(r.response_meta, '$.scorePercentage') as 'scorePercentage', 
            JSON_EXTRACT(r.response_meta, '$.result') as 'result', 
            JSON_EXTRACT(t.test_meta, '$.testName') as 'testName', 
            t.id as 'testId', r.id as 'responseId' 
            FROM ta_invitations i 
            JOIN ta_candidates c ON JSON_EXTRACT(i.invitation_meta , '$.candidateId') = c.id 
            JOIN ta_tests t ON JSON_EXTRACT(i.invitation_meta , '$.testId') = t.id 
            LEFT JOIN ta_mcqresponses r ON JSON_EXTRACT(r.response_meta , '$.invitationId') = i.id
            WHERE t.id = ${testId}
        `;
    }
}
export default queries;


