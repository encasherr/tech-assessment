import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff, teacher } from '../RoleDefinitions';

export const VIEW_MCQS = 'VIEW_MCQS'; 
export const VIEW_MCQS_BY_SKILL = 'VIEW_MCQS_BY_SKILL';
export const VIEW_MCQS_BY_DESCRIPTION = 'VIEW_MCQS_BY_DESCRIPTION';

const orgAdminQueryFilter = `SELECT * FROM ta_mcq m 
                        JOIN ta_users u ON m.addedBy = u.id
                        WHERE (JSON_EXTRACT(u.user_meta, '$.orgId') = paramOrgId
                            OR JSON_EXTRACT(u.user_meta, '$.role') = 'paramAdminRole')
                            AND m.category in ('Programming', 'Aptitude')`;

export const VIEW_MCQS_QUERY = {
    key: VIEW_MCQS,
    value: {
        getSql: (userEntity) => {
            console.log(`getsql for user: ${userEntity}`);
            switch(userEntity.role) {
                case admin: {
                    return `SELECT * FROM ta_mcq m`;
                }
                case staff:
                case orgadmin: {
                    return orgAdminQueryFilter.replace('paramOrgId', userEntity.orgId)
                                                .replace('paramAdminRole', admin);
                }
                case teacher: {
                    return `SELECT m.* FROM ta_mcq m 
                    JOIN ta_users u ON m.addedBy = u.id
                    WHERE (m.addedBy = ${userEntity.id}
                    OR JSON_EXTRACT(u.user_meta, '$.role') = '${admin}')
                    AND m.category in ('Academic', 'General Knowledge')
                    `;
                }
                default: handleRoleNotFound(userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if (data && data.length > 0) {
                data.map((item, index) => {
                    let mcq_meta = item['mcq_meta'];
                    mcq_meta = mcq_meta.replace(/\n/g, "\\n");
                    mcq_meta = mcq_meta.replace(/\r/g, "\\r");
                    mcq_meta = mcq_meta.replace(/\t/g, "\\t");
                    let output = {};
                    output.id = item.id;
                    try {
                        output['mcq_meta'] = JSON.parse(mcq_meta);
                        outputArray.push(output);
                    }
                    catch(exception) {
                        console.log('exception in parsing mcqMeta', mcq_meta);
                        console.log(exception);
                    }
                })
            }
            return outputArray;
        }
    }
}

export const VIEW_MCQS_BY_SKILL_QUERY = {
    key: VIEW_MCQS_BY_SKILL,
    value: {
        getSql: (params) => {
            console.log(`getsql for user: ${params.userEntity}`);
            if(!params.userEntity) {
                return handleRoleNotFound('null userEntity');
            }
            if(!params.skill) {
                return handleRoleNotFound('null skill');
            }
            let skill = params.skill.toLowerCase();
            switch(params.userEntity.role) {
                case admin: {
                    return `SELECT * FROM ta_mcq m
                    WHERE LOWER(m.skill) = '${skill}'
                    `;
                }
                case staff:
                case orgadmin: {
                    // return `SELECT * FROM ta_mcq m 
                    //     JOIN ta_users u ON m.addedBy = u.id
                    //     WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${params.userEntity.orgId}
                    //     AND LOWER(m.skill) = '${skill}'
                    // `;
                    return `${orgAdminQueryFilter.replace('paramOrgId', userEntity.orgId)
                                                .replace('paramAdminRole', admin)}
                                                AND LOWER(m.skill) = '${skill}'`;
                }
                case teacher: {
                    return `SELECT * FROM ta_mcq m 
                        JOIN ta_users u ON m.addedBy = u.id
                        WHERE LOWER(m.skill) = '${skill}'
                        AND (u.id = ${params.userEntity.id} OR JSON_EXTRACT(u.user_meta, '$.role') = '${admin}')
                    `;
                }
                default: return handleRoleNotFound(params.userEntity.role);
            }
        },
        serializeToJson: (data) => {
            return serializeToJson(data);
        }
    }
}


export const VIEW_MCQS_BY_DESCRIPTION_QUERY = {
    key: VIEW_MCQS_BY_DESCRIPTION,
    value: {
        getSql: (params) => {
            console.log(`getsql for user: ${params.userEntity}`);
            if(!params.userEntity) {
                return handleRoleNotFound('null userEntity');
            }
            if(!params.description) {
                return handleRoleNotFound('null description');
            }
            switch(params.userEntity.role) {
                case admin: {
                    return `SELECT * FROM ta_mcq m
                    WHERE JSON_EXTRACT(m.mcq_meta, '$.description') = '${params.description}'
                    `;
                }
                case staff:
                case orgadmin: {
                    // return `SELECT * FROM ta_mcq m 
                    //     JOIN ta_users u ON m.addedBy = u.id
                    //     WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${params.userEntity.orgId}
                    //     AND JSON_EXTRACT(m.mcq_meta, '$.description') = '${params.description}'
                    // `;
                    return `${orgAdminQueryFilter.replace('paramOrgId', userEntity.orgId)
                                                .replace('paramAdminRole', admin)}
                                AND JSON_EXTRACT(m.mcq_meta, '$.description') = '${params.description}'`;
                }
                case teacher: {
                    return `SELECT * FROM ta_mcq m 
                        JOIN ta_users u ON m.addedBy = u.id
                        WHERE  JSON_EXTRACT(m.mcq_meta, '$.description') = '${params.description}
                        AND (u.id = ${params.userEntity.id} OR JSON_EXTRACT(u.user_meta, '$.role') = '${admin}')
                    `;
                }
                default: return handleRoleNotFound(params.userEntity.role);
            }
        },
        serializeToJson: (data) => {
            return serializeToJson(data);
        }
    }
}


const serializeToJson = (data) => {
    let outputArray = [];
    console.log('data count', data.length);
    if (data && data.length > 0) {
        data.map((item, index) => {
            let mcq_meta = item['mcq_meta'];
            mcq_meta = mcq_meta.replace(/\n/g, "\\n");
            mcq_meta = mcq_meta.replace(/\r/g, "\\r");
            mcq_meta = mcq_meta.replace(/\t/g, "\\t");
            let output = {};
            output.id = item.id;
            try {
                output['mcq_meta'] = JSON.parse(mcq_meta);
                outputArray.push(output);
            }
            catch(exception) {
                console.log('exception in parsing mcqMeta', mcq_meta);
            }
        })
    }
    return outputArray;
}