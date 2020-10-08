import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff } from '../RoleDefinitions';

export const VIEW_INVITATIONS = 'VIEW_INVITATIONS'; 

export const VIEW_INVITATIONS_QUERY = {
    key: VIEW_INVITATIONS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return globalQueries.getAllInvitationsQuery();
                }
                case staff:
                case orgadmin: {
                    return globalQueries.getInvitationsByOrgQuery(userEntity.orgId);
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
                    output['mcq_meta'] = JSON.parse(item['mcq_meta']);
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}