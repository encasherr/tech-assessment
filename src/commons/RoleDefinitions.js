import globalQueries from '../db/queries';

export const VIEW_MCQS = 'VIEW_MCQS';
export const VIEW_TESTS = 'VIEW_TESTS';
export const VIEW_INVITATIONS = 'VIEW_INVITATIONS';
export const VIEW_USERS = 'VIEW_USERS';
export const VIEW_ORGS = 'VIEW_ORGS';
export const admin = 'admin';
export const orgadmin = 'orgadmin';
export const staff = 'staff';

const handleRoleNotFound = (role) => {
    console.log(`${role} role not found`);
    return '';
}

export const HandlePromise = (db, queryConfig, userEntity) => {
    return new Promise((resolve, reject) => {
        if (queryConfig) {
            userEntity = userEntity || { role: 'admin' };
            let sql = queryConfig.value.getSql(userEntity);
            if (!sql) reject('unauthorized');
            db.executeQuery(sql).then((res) => {
                if (res) {
                    let output = queryConfig.value.serializeToJson(res);
                    resolve(output);
                }
            }).catch((err) => {
                reject(err);
            });
        }
    });
}

export const GetQueryConfig = (action) => {
    let queryConfigs = RoleDefinitions.queries.filter((queryItem, idx) => {
        return queryItem.key === action;
    });
    let queryConfig = queryConfigs[0];
    return queryConfig;
}

export const RoleDefinitions = {
    role: admin,
    allowedActions: [
        'addMcq', 'addTest', 'addUser', 'addCategory', 'addSkill', 'addOrganization',
        'sendInvitation',
        'viewTests', 'viewMcqs', 'viewUsers', 'viewOrgs'
    ],
    queries: [
        {
            key: VIEW_MCQS,
            value: {
                getSql: (userEntity) => {
                    switch (userEntity.role) {
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
        },
        {
            key: VIEW_TESTS,
            value: {
                getSql: (userEntity) => {
                    switch (userEntity.role) {
                        case admin: {
                            return `SELECT 
                                JSON_EXTRACT(t.test_meta, '$') as 'test_meta',
                                t.id as 'id',
                                JSON_EXTRACT(u.user_meta, '$') as 'user_meta' 
                                FROM ta_tests t
                                JOIN ta_users u ON JSON_EXTRACT(t.test_meta, '$.createdBy') = u.id
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
                    if (data && data.length > 0) {
                        data.map((item, index) => {
                            let output = {};
                            output.id = item.id;
                            output['test_meta'] = JSON.parse(item['test_meta']);
                            output['user_meta'] = JSON.parse(item['user_meta']);
                            outputArray.push(output);
                        })
                    }
                    return outputArray;
                }
            }
        },
        {
            key: VIEW_INVITATIONS,
            value: {
                getSql: (userEntity) => {
                    switch (userEntity.role) {
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
                    if (data && data.length > 0) {
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
        },
        {
            key: VIEW_USERS,
            value: {
                getSql: (userEntity) => {
                    switch (userEntity.role) {
                        case admin: {
                            return `SELECT 
                                u.id as 'id',
                                JSON_EXTRACT(u.user_meta, '$') as 'user_meta',
                                JSON_EXTRACT(o.org_meta, '$') as 'org_meta'
                                FROM ta_users u
                                LEFT JOIN ta_org o ON JSON_EXTRACT(u.user_meta, '$.orgId') = o.id
                                `;
                        }
                        case staff:
                        case orgadmin: {
                            return `SELECT 
                                    u.id as 'id',
                                    JSON_EXTRACT(u.user_meta, '$') as 'user_meta',
                                    JSON_EXTRACT(o.org_meta, '$') as 'org_meta'
                                    FROM ta_users u
                                    LEFT JOIN ta_org o ON JSON_EXTRACT(u.user_meta, '$.orgId') = o.id
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
                            let output = {};
                            output.id = item.id;
                            output['user_meta'] = JSON.parse(item['user_meta']);
                            output['org_meta'] = JSON.parse(item['org_meta']);
                            outputArray.push(output);
                        })
                    }
                    return outputArray;
                }
            }
        },
        {
            key: VIEW_ORGS,
            value: {
                getSql: (userEntity) => {
                    switch (userEntity.role) {
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
                    if (data && data.length > 0) {
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
    ]
}
