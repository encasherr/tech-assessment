import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff } from '../RoleDefinitions';

export const VIEW_MCQS = 'VIEW_MCQS'; 

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
                    return `SELECT * FROM ta_mcq m 
                        JOIN ta_users u ON JSON_EXTRACT(m.mcq_meta, '$.createdBy') = u.id
                        WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${userEntity.orgId}
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
                    output['mcq_meta'] = JSON.parse(mcq_meta);
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}