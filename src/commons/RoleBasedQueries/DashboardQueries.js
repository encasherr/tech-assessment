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
            return data && data.length > 0 ? data[0].cnt : 0;
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
            return data && data.length > 0 ? data[0].cnt : 0;
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
            return data && data.length > 0 ? data[0].cnt : 0;
        }
    }
}