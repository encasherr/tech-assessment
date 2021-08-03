import globalQueries from '../db/queries';
import { VIEW_DASHBOARD_INVITATION,
        VIEW_DASHBOARD_TESTS,
        VIEW_DASHBOARD_MCQ } from './RoleBasedQueries/DashboardQueries';
import { VIEW_MCQS_QUERY, VIEW_MCQS_BY_SKILL_QUERY,
    VIEW_MCQS_BY_DESCRIPTION_QUERY } from './RoleBasedQueries/McqQueries';
import { VIEW_TESTS, VIEW_TESTS_QUERY, VIEW_TEST_BY_ID_QUERY, 
    VIEW_MY_TESTS_QUERY, VIEW_TESTS_AVAILABLE_FOR_ME_QUERY } from './RoleBasedQueries/TestQueries';
import { VIEW_INVITATIONS_QUERY } from './RoleBasedQueries/InvitationQueries';
import { VIEW_USERS_QUERY } from './RoleBasedQueries/UserQueries';
import { VIEW_ORGS_QUERY } from './RoleBasedQueries/OrgQueries';
import { VIEW_GRADES_QUERY } from './RoleBasedQueries/GradeQueries';

export const admin = 'admin';
export const orgadmin = 'orgadmin';
export const staff = 'staff';
export const candidate = 'candidate';
export const teacher = 'teacher';
export const student = 'student';

export const handleRoleNotFound = (role) => {
    console.log(`${role} role not found`);
    return '';
}

export const HandlePromise = (db, queryConfig, userEntity) => {
    return new Promise((resolve, reject) => {
        if(queryConfig) {
            let sql = queryConfig.value.getSql(userEntity);
            if(!sql) reject('unauthorized');
            db.executeQuery(sql).then((res) => {
                if(res) {
                    let output = queryConfig.value.serializeToJson(res);
                    resolve(output);
                }
            }).catch((err) => {
                reject(err);
            });
        }
        else {
            reject('No query configuration found');
        }
    });
}

export const HandlePromiseWithParams = (db, queryConfig, params) => {
    return new Promise((resolve, reject) => {
        if(queryConfig) {
            console.log(`${params} params`);
            let sql = queryConfig.value.getSql(params);
            if(!sql) reject('unauthorized');
            db.executeQuery(sql).then((res) => {
                // console.log('execute query result: ', res);
                if(res) {
                    let output = queryConfig.value.serializeToJson(res);
                    // console.log('resolving out:', output);
                    resolve(output);
                }
            }).catch((err) => {
                reject(err);
            });
        }
        else {
            reject('No query configuration found');
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
            VIEW_MCQS_QUERY,
            VIEW_MCQS_BY_SKILL_QUERY,
            VIEW_MCQS_BY_DESCRIPTION_QUERY,
            VIEW_TESTS_QUERY,
            VIEW_TESTS_AVAILABLE_FOR_ME_QUERY,
            VIEW_MY_TESTS_QUERY,
            VIEW_TEST_BY_ID_QUERY,
            VIEW_INVITATIONS_QUERY,
            VIEW_USERS_QUERY,
            VIEW_ORGS_QUERY,
            VIEW_DASHBOARD_INVITATION,
            VIEW_DASHBOARD_TESTS,
            VIEW_DASHBOARD_MCQ,
            VIEW_GRADES_QUERY
        ]
    }
   