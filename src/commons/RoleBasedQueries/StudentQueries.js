import { handleRoleNotFound, admin, staff, teacher, student } from '../RoleDefinitions';

export const VIEW_STUDENTS = 'VIEW_STUDENTS';
export const VIEW_STUDENT_BY_ID = 'VIEW_STUDENT_BY_ID';

export const VIEW_STUDENTS_QUERY = {
    key: VIEW_STUDENTS,
    value: {
        getSql: (params) => {
            switch (params.userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case student: {
                    return `
                    SELECT *
                    FROM ta_students
                    `;
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

export const VIEW_STUDENT_BY_ID_QUERY = {
    key: VIEW_STUDENT_BY_ID,
    value: {
        getSql: (params) => {
            let { userEntity, studentId } = params;
            switch (userEntity.role) {
                case admin:
                case staff:
                case teacher:
                case student:{
                    return `
                    SELECT *
                    FROM ta_students
                    WHERE id = ${studentId}
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
                    Object.keys(item).forEach((key) => {
                        output[key] = item[key];
                    })
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}
