import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff, teacher } from '../RoleDefinitions';

export const VIEW_INVITATIONS = 'VIEW_INVITATIONS'; 

export const VIEW_INVITATIONS_QUERY = {
    key: VIEW_INVITATIONS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return queries.getAllInvitationsQuery();
                }
                case staff:
                case orgadmin: {
                    return queries.getInvitationsByOrgQuery(userEntity.orgId);
                }
                case teacher: {
                    return queries.getInvitationsByCreateUserQuery(userEntity.id);
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
                    Object.keys(item).map((prop) => {
                        if(prop === 'response_meta') {
                            let metaObj = item[prop];
                            if(metaObj) {
                                metaObj = metaObj.replace(/\n/g, "\\n");
                                metaObj = metaObj.replace(/\r/g, "\\r");
                                metaObj = metaObj.replace(/\t/g, "\\t"); 
                                let mObj = JSON.parse(metaObj);
                                Object.keys(mObj).forEach((metaProp) => {
                                    output[metaProp] = mObj[metaProp];
                                })
                            }
                        }
                        else {
                            output[prop] = item[prop];
                        }
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}