import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff } from '../RoleDefinitions';

export const VIEW_DASHBOARD_TESTS_COUNT = 'VIEW_DASHBOARD_TESTS_COUNT';
export const VIEW_DASHBOARD_INVITATION_COUNT = 'VIEW_DASHBOARD_INVITATION_COUNT';
export const VIEW_DASHBOARD_MCQ_COUNT = 'VIEW_DASHBOARD_MCQ_COUNT';

export const VIEW_DASHBOARD_INVITATION = {
    key: VIEW_DASHBOARD_INVITATION_COUNT,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return queries.getInvitationCountForAdmin();
                }
                case staff:
                case orgadmin: {
                    return queries.getInvitationCountByOrgId(userEntity.orgId);
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
                    output.invitationStatus = item.invitationStatus;
                    output.invitationCount = item.invitationCount;
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}

export const VIEW_DASHBOARD_TESTS = {
    key: VIEW_DASHBOARD_TESTS_COUNT,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return queries.getTestCountForAdmin();
                }
                case staff:
                case orgadmin: {
                    return queries.getTestCountByOrgId(userEntity.orgId);
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
                    output.testStatus = item.testStatus;
                    output.testCount = item.testCount;
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}

export const VIEW_DASHBOARD_MCQ = {
    key: VIEW_DASHBOARD_MCQ_COUNT,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin: {
                    return queries.getMcqCountForAdmin();
                }
                case staff:
                case orgadmin: {
                    return queries.getMcqCountByOrgId(userEntity.orgId);
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
                    output.mcqSkill = item.mcqSkill;
                    output.mcqCount = item.mcqCount;
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}