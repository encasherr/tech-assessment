import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff } from '../RoleDefinitions';

export const VIEW_ORGS = 'VIEW_ORGS'; 

export const VIEW_ORGS_QUERY = {
    key: VIEW_ORGS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin:
                case orgadmin: {
                    return `SELECT * FROM ta_org u`
                }
                default: handleRoleNotFound(userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if(data && data.length > 0) {
                data.map((item, index) => {
                    let output = {};
                    output.id = item.id;
                    output['org_meta'] = JSON.parse(item['org_meta']);
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}