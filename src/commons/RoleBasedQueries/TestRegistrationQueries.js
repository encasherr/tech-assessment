import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff, teacher, student, candidate } from '../RoleDefinitions';

export const VIEW_TEST_REGISTRATIONS = 'VIEW_TEST_REGISTRATIONS';
export const VIEW_MY_TEST_REGISTRATIONS = 'VIEW_MY_TEST_REGISTRATIONS';
export const VIEW_REGISTRATIONS_FOR_TEST = 'VIEW_REGISTRATIONS_FOR_TEST';
export const VIEW_TEST_REGISTRATION_BY_ID = 'VIEW_TEST_REGISTRATION_BY_ID';

export const VIEW_TEST_REGISTRATIONS_QUERY = {
    key: VIEW_TEST_REGISTRATIONS,
    value: {
        getSql: (userEntity) => {
            switch (userEntity.role) {
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
            if (data && data.length > 0) {
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
            switch (userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case orgadmin:
                case candidate:
                case student: {
                    return queries.getAllRegistrationsForUserQuery(userEntity.id);
                }
                default: handleRoleNotFound(userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if (data && data.length > 0) {
                data.map((item, index) => {
                    let output = {};
                    output.id = item.id;
                    
                    let item_value = item['response_meta'];
                    if(item_value) {
                        item_value = item_value.replace(/\n/g, "\\n");
                        item_value = item_value.replace(/\r/g, "\\r");
                        item_value = item_value.replace(/\t/g, "\\t");
                        output['response_meta'] = JSON.parse(item_value);
                    }
                    item_value = item['evaluation_meta'];
                    if(item_value) {
                        item_value = item_value.replace(/\n/g, "\\n");
                        item_value = item_value.replace(/\r/g, "\\r");
                        item_value = item_value.replace(/\t/g, "\\t");
                        output['evaluation_meta'] = JSON.parse(item_value);
                    }

                    item_value = item['test_meta'];
                    if(item_value) {
                        item_value = item_value.replace(/\n/g, "\\n");
                        item_value = item_value.replace(/\r/g, "\\r");
                        item_value = item_value.replace(/\t/g, "\\t");
                        output['test_meta'] = JSON.parse(item_value);
                    }
                    output['registrationId'] = item.registrationId;
                    output['status'] = item.status;
                    output['grade'] = item.grade;
                    output['subject'] = item.subject;
                    output['testName'] = item.testName;
                    output['scheduledStart'] = item.scheduled_start;
                    output['modifiedOn'] = item.modified_on;

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
            switch (params.userEntity.role) {
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
            if (data && data.length > 0) {
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

export const VIEW_TEST_REGISTRATION_BY_ID_QUERY = {
    key: VIEW_TEST_REGISTRATION_BY_ID,
    value: {
        getSql: (params) => {
            let { userEntity, registrationId } = params;
            switch (userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case candidate:
                case student:
                case orgadmin: {
                    return `
                    SELECT *
                    FROM ta_test_registrations
                    WHERE id = ${registrationId}
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
                    let output = {};
                    output.id = item.id;
                    let item_value = item['response_meta'];
                    if(item_value) {
                        item_value = item_value.replace(/\n/g, "\\n");
                        item_value = item_value.replace(/\r/g, "\\r");
                        item_value = item_value.replace(/\t/g, "\\t");
                        output['response_meta'] = JSON.parse(item_value);
                    }
                    item_value = item['evaluation_meta'];
                    if(item_value) {
                        item_value = item_value.replace(/\n/g, "\\n");
                        item_value = item_value.replace(/\r/g, "\\r");
                        item_value = item_value.replace(/\t/g, "\\t");
                        output['evaluation_meta'] = JSON.parse(item_value);
                    }
                    Object.keys(item).forEach((key) => {
                        if(key !== 'response_meta' && key !== 'evaluation_meta') {
                            output[key] = item[key];
                        }
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}
