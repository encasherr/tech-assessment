'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoleDefinitions = exports.GetQueryConfig = exports.HandlePromise = exports.staff = exports.orgadmin = exports.admin = exports.VIEW_ORGS = exports.VIEW_USERS = exports.VIEW_INVITATIONS = exports.VIEW_TESTS = exports.VIEW_MCQS = undefined;

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VIEW_MCQS = exports.VIEW_MCQS = 'VIEW_MCQS';
var VIEW_TESTS = exports.VIEW_TESTS = 'VIEW_TESTS';
var VIEW_INVITATIONS = exports.VIEW_INVITATIONS = 'VIEW_INVITATIONS';
var VIEW_USERS = exports.VIEW_USERS = 'VIEW_USERS';
var VIEW_ORGS = exports.VIEW_ORGS = 'VIEW_ORGS';
var admin = exports.admin = 'admin';
var orgadmin = exports.orgadmin = 'orgadmin';
var staff = exports.staff = 'staff';

var handleRoleNotFound = function handleRoleNotFound(role) {
    console.log(role + ' role not found');
    return '';
};

var HandlePromise = exports.HandlePromise = function HandlePromise(db, queryConfig, userEntity) {
    return new Promise(function (resolve, reject) {
        if (queryConfig) {
            userEntity = userEntity || { role: 'admin' };
            var sql = queryConfig.value.getSql(userEntity);
            if (!sql) reject('unauthorized');
            db.executeQuery(sql).then(function (res) {
                if (res) {
                    var output = queryConfig.value.serializeToJson(res);
                    resolve(output);
                }
            }).catch(function (err) {
                reject(err);
            });
        }
    });
};

var GetQueryConfig = exports.GetQueryConfig = function GetQueryConfig(action) {
    var queryConfigs = RoleDefinitions.queries.filter(function (queryItem, idx) {
        return queryItem.key === action;
    });
    var queryConfig = queryConfigs[0];
    return queryConfig;
};

var RoleDefinitions = exports.RoleDefinitions = {
    role: admin,
    allowedActions: ['addMcq', 'addTest', 'addUser', 'addCategory', 'addSkill', 'addOrganization', 'sendInvitation', 'viewTests', 'viewMcqs', 'viewUsers', 'viewOrgs'],
    queries: [{
        key: VIEW_MCQS,
        value: {
            getSql: function getSql(userEntity) {
                switch (userEntity.role) {
                    case admin:
                        {
                            return 'SELECT * FROM ta_mcq m';
                        }
                    case staff:
                    case orgadmin:
                        {
                            return 'SELECT * FROM ta_mcq m \n                                    JOIN ta_users u ON JSON_EXTRACT(m.mcq_meta, \'$.createdBy\') = u.id\n                                    WHERE JSON_EXTRACT(u.user_meta, \'$.orgId\') = ' + userEntity.orgId + '\n                                ';
                        }
                    default:
                        handleRoleNotFound(userEntity.role);
                }
            },
            serializeToJson: function serializeToJson(data) {
                var outputArray = [];
                console.log('data count', data.length);
                if (data && data.length > 0) {
                    data.map(function (item, index) {
                        var mcq_meta = item['mcq_meta'];
                        mcq_meta = mcq_meta.replace(/\n/g, "\\n");
                        mcq_meta = mcq_meta.replace(/\r/g, "\\r");
                        mcq_meta = mcq_meta.replace(/\t/g, "\\t");
                        var output = {};
                        output.id = item.id;
                        output['mcq_meta'] = JSON.parse(mcq_meta);
                        outputArray.push(output);
                    });
                }
                return outputArray;
            }
        }
    }, {
        key: VIEW_TESTS,
        value: {
            getSql: function getSql(userEntity) {
                switch (userEntity.role) {
                    case admin:
                        {
                            return 'SELECT \n                                JSON_EXTRACT(t.test_meta, \'$\') as \'test_meta\',\n                                t.id as \'id\',\n                                JSON_EXTRACT(u.user_meta, \'$\') as \'user_meta\' \n                                FROM ta_tests t\n                                JOIN ta_users u ON JSON_EXTRACT(t.test_meta, \'$.createdBy\') = u.id\n                                ';
                        }
                    case staff:
                    case orgadmin:
                        {
                            return 'SELECT \n                                    JSON_EXTRACT(t.test_meta, \'$\') as \'test_meta\',\n                                    t.id as \'id\',\n                                    JSON_EXTRACT(u.user_meta, \'$\') as \'user_meta\' \n                                    FROM ta_tests t\n                                    JOIN ta_users u ON JSON_EXTRACT(t.test_meta, \'$.createdBy\') = u.id\n                                    WHERE JSON_EXTRACT(u.user_meta, \'$.orgId\') = ' + userEntity.orgId + '\n                                ';
                        }
                    default:
                        handleRoleNotFound(userEntity.role);
                }
            },
            serializeToJson: function serializeToJson(data) {
                var outputArray = [];
                console.log('data count', data.length);
                if (data && data.length > 0) {
                    data.map(function (item, index) {
                        var output = {};
                        output.id = item.id;
                        output['test_meta'] = JSON.parse(item['test_meta']);
                        output['user_meta'] = JSON.parse(item['user_meta']);
                        outputArray.push(output);
                    });
                }
                return outputArray;
            }
        }
    }, {
        key: VIEW_INVITATIONS,
        value: {
            getSql: function getSql(userEntity) {
                switch (userEntity.role) {
                    case admin:
                        {
                            return _queries2.default.getAllInvitationsQuery();
                        }
                    case staff:
                    case orgadmin:
                        {
                            return _queries2.default.getInvitationsByOrgQuery(userEntity.orgId);
                        }
                    default:
                        handleRoleNotFound(userEntity.role);
                }
            },
            serializeToJson: function serializeToJson(data) {
                var outputArray = [];
                console.log('data count', data.length);
                if (data && data.length > 0) {
                    data.map(function (item, index) {
                        var output = {};
                        output.id = item.id;
                        output['mcq_meta'] = JSON.parse(item['mcq_meta']);
                        outputArray.push(output);
                    });
                }
                return outputArray;
            }
        }
    }, {
        key: VIEW_USERS,
        value: {
            getSql: function getSql(userEntity) {
                switch (userEntity.role) {
                    case admin:
                        {
                            return 'SELECT \n                                u.id as \'id\',\n                                JSON_EXTRACT(u.user_meta, \'$\') as \'user_meta\',\n                                JSON_EXTRACT(o.org_meta, \'$\') as \'org_meta\'\n                                FROM ta_users u\n                                LEFT JOIN ta_org o ON JSON_EXTRACT(u.user_meta, \'$.orgId\') = o.id\n                                ';
                        }
                    case staff:
                    case orgadmin:
                        {
                            return 'SELECT \n                                    u.id as \'id\',\n                                    JSON_EXTRACT(u.user_meta, \'$\') as \'user_meta\',\n                                    JSON_EXTRACT(o.org_meta, \'$\') as \'org_meta\'\n                                    FROM ta_users u\n                                    LEFT JOIN ta_org o ON JSON_EXTRACT(u.user_meta, \'$.orgId\') = o.id\n                                    WHERE JSON_EXTRACT(u.user_meta, \'$.orgId\') = ' + userEntity.orgId + '\n                                ';
                        }
                    default:
                        handleRoleNotFound(userEntity.role);
                }
            },
            serializeToJson: function serializeToJson(data) {
                var outputArray = [];
                console.log('data count', data.length);
                if (data && data.length > 0) {
                    data.map(function (item, index) {
                        var output = {};
                        output.id = item.id;
                        output['user_meta'] = JSON.parse(item['user_meta']);
                        output['org_meta'] = JSON.parse(item['org_meta']);
                        outputArray.push(output);
                    });
                }
                return outputArray;
            }
        }
    }, {
        key: VIEW_ORGS,
        value: {
            getSql: function getSql(userEntity) {
                switch (userEntity.role) {
                    case admin:
                    case orgadmin:
                        {
                            return 'SELECT * FROM ta_org u';
                        }
                    default:
                        handleRoleNotFound(userEntity.role);
                }
            },
            serializeToJson: function serializeToJson(data) {
                var outputArray = [];
                console.log('data count', data.length);
                if (data && data.length > 0) {
                    data.map(function (item, index) {
                        var output = {};
                        output.id = item.id;
                        output['org_meta'] = JSON.parse(item['org_meta']);
                        outputArray.push(output);
                    });
                }
                return outputArray;
            }
        }
    }]
};
//# sourceMappingURL=RoleDefinitions.js.map