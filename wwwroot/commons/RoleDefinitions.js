'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoleDefinitions = exports.GetQueryConfig = exports.HandlePromiseWithParams = exports.HandlePromise = exports.handleRoleNotFound = exports.teacher = exports.candidate = exports.staff = exports.orgadmin = exports.admin = undefined;

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _DashboardQueries = require('./RoleBasedQueries/DashboardQueries');

var _McqQueries = require('./RoleBasedQueries/McqQueries');

var _TestQueries = require('./RoleBasedQueries/TestQueries');

var _InvitationQueries = require('./RoleBasedQueries/InvitationQueries');

var _UserQueries = require('./RoleBasedQueries/UserQueries');

var _OrgQueries = require('./RoleBasedQueries/OrgQueries');

var _GradeQueries = require('./RoleBasedQueries/GradeQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin = exports.admin = 'admin';
var orgadmin = exports.orgadmin = 'orgadmin';
var staff = exports.staff = 'staff';
var candidate = exports.candidate = 'candidate';
var teacher = exports.teacher = 'teacher';

var handleRoleNotFound = exports.handleRoleNotFound = function handleRoleNotFound(role) {
    console.log(role + ' role not found');
    return '';
};

var HandlePromise = exports.HandlePromise = function HandlePromise(db, queryConfig, userEntity) {
    return new Promise(function (resolve, reject) {
        if (queryConfig) {
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
        } else {
            reject('No query configuration found');
        }
    });
};

var HandlePromiseWithParams = exports.HandlePromiseWithParams = function HandlePromiseWithParams(db, queryConfig, params) {
    return new Promise(function (resolve, reject) {
        if (queryConfig) {
            console.log(params.skill + ' params');
            var sql = queryConfig.value.getSql(params);
            if (!sql) reject('unauthorized');
            db.executeQuery(sql).then(function (res) {
                if (res) {
                    var output = queryConfig.value.serializeToJson(res);
                    resolve(output);
                }
            }).catch(function (err) {
                reject(err);
            });
        } else {
            reject('No query configuration found');
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
    queries: [_McqQueries.VIEW_MCQS_QUERY, _McqQueries.VIEW_MCQS_BY_SKILL_QUERY, _TestQueries.VIEW_TESTS_QUERY, _TestQueries.VIEW_MY_TESTS_QUERY, _TestQueries.VIEW_TEST_BY_ID_QUERY, _InvitationQueries.VIEW_INVITATIONS_QUERY, _UserQueries.VIEW_USERS_QUERY, _OrgQueries.VIEW_ORGS_QUERY, _DashboardQueries.VIEW_DASHBOARD_INVITATION, _DashboardQueries.VIEW_DASHBOARD_TESTS, _DashboardQueries.VIEW_DASHBOARD_MCQ, _GradeQueries.VIEW_GRADES_QUERY]
};
//# sourceMappingURL=RoleDefinitions.js.map