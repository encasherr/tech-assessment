import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff, teacher, student } from '../RoleDefinitions';

export const VIEW_TEST_REGISTRATIONS = 'VIEW_TEST_REGISTRATIONS'; 
export const VIEW_MY_TEST_REGISTRATIONS = 'VIEW_MY_TEST_REGISTRATIONS';
export const VIEW_REGISTRATIONS_FOR_TEST = 'VIEW_REGISTRATIONS_FOR_TEST';

export const VIEW_TEST_REGISTRATIONS_QUERY = {
    key: VIEW_TEST_REGISTRATIONS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return queries.getAllRegistrationsQuery();
                }
                case staff:
                case teacher:
                case orgadmin: {
                    return queries.getAllRegistrationsForAuthorQuery(userEntity.id);
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
                        output[prop] = item[prop];
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}

export const VIEW_MY_TEST_REGISTRATIONS_QUERY = {
    key: VIEW_MY_TEST_REGISTRATIONS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case orgadmin:
                case student: {
                    return queries.getAllRegistrationsForCandidateIdQuery(userEntity.id);
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
                        output[prop] = item[prop];
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}

export const VIEW_REGISTRATIONS_FOR_TEST_QUERY = {
    key: VIEW_REGISTRATIONS_FOR_TEST,
    value: {
        getSql: (params) => {
            switch(params.userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case orgadmin: {
                    return queries.getAllRegistrationsForTestIdQuery(params.testId);
                }
                default: handleRoleNotFound(params.userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if(data && data.length > 0) {
                data.map((item, index) => {
                    let output = {};
                    Object.keys(item).map((prop) => {
                        output[prop] = item[prop];
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}
