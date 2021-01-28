import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff } from '../RoleDefinitions';

export const VIEW_TESTS = 'VIEW_TESTS'; 
export const VIEW_TESTS_BY_ID = 'VIEW_TESTS_BY_ID';

export const VIEW_TESTS_QUERY = {
    key: VIEW_TESTS,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return `SELECT 
                    JSON_EXTRACT(t.test_meta, '$') as 'test_meta',
                    t.id as 'id',
                    JSON_EXTRACT(u.user_meta, '$') as 'user_meta' 
                    FROM ta_tests t
                    JOIN ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id
                    AND JSON_EXTRACT(t.test_meta, '$.settings.testVisibility') = 'InvitedCandidates'
                    `;
                }
                case staff:
                case orgadmin: {
                    return `SELECT 
                        JSON_EXTRACT(t.test_meta, '$') as 'test_meta',
                        t.id as 'id',
                        JSON_EXTRACT(u.user_meta, '$') as 'user_meta' 
                        FROM ta_tests t
                        JOIN ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id
                        WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${userEntity.orgId}
                    `;                                
                }
                default: handleRoleNotFound(userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if(data && data.length > 0) {
                data.map((item, index) => {

                    let test_meta = item['test_meta'];
                    test_meta = test_meta.replace(/\n/g, "\\n");
                    test_meta = test_meta.replace(/\r/g, "\\r");
                    test_meta = test_meta.replace(/\t/g, "\\t");
                    let output = {};
                    output.id = item.id;
                    output['test_meta'] = JSON.parse(test_meta);
                    output['user_meta'] = JSON.parse(item['user_meta']);
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}


export const VIEW_TEST_BY_ID_QUERY = {
    key: VIEW_TESTS_BY_ID,
    value: {
        getSql: (params) => {
            let { userEntity, testId } = params;
            if(!userEntity) {
                return handleRoleNotFound('null userEntity');
            }
            if(!testId) {
                return handleRoleNotFound('null skill');
            }
            switch(userEntity.role) {
                case admin: {
                    return `SELECT 
                    JSON_EXTRACT(t.test_meta, '$') as 'test_meta',
                    t.id as 'id',
                    JSON_EXTRACT(u.user_meta, '$') as 'user_meta' 
                    FROM ta_tests t
                    JOIN ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id
                    WHERE t.id = ${testId}
                    `;
                }
                case staff:
                case orgadmin: {
                    return `SELECT 
                        JSON_EXTRACT(t.test_meta, '$') as 'test_meta',
                        t.id as 'id',
                        JSON_EXTRACT(u.user_meta, '$') as 'user_meta' 
                        FROM ta_tests t
                        JOIN ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id
                        WHERE JSON_EXTRACT(u.user_meta, '$.orgId') = ${userEntity.orgId}
                        AND t.id = $M{testId}
                    `;                                
                }
                default: handleRoleNotFound(userEntity.role);
            }
        },
        serializeToJson: (data) => {
            let outputArray = [];
            console.log('data count', data.length);
            if(data && data.length > 0) {
                data.map((item, index) => {

                    let test_meta = item['test_meta'];
                    test_meta = test_meta.replace(/\n/g, "\\n");
                    test_meta = test_meta.replace(/\r/g, "\\r");
                    test_meta = test_meta.replace(/\t/g, "\\t");
                    let output = {};
                    output.id = item.id;
                    output['test_meta'] = JSON.parse(test_meta);
                    output['user_meta'] = JSON.parse(item['user_meta']);
                    outputArray.push(output);
                })
            }
            return outputArray[0];
        }
    }
}