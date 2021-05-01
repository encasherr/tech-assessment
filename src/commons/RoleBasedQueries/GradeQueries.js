import queries from '../../db/queries';
import { handleRoleNotFound, admin, orgadmin, staff, teacher } from '../RoleDefinitions';

export const VIEW_GRADES = 'VIEW_GRADES'; 

export const VIEW_GRADES_QUERY = {
    key: VIEW_GRADES,
    value: {
        getSql: (userEntity) => {
            switch(userEntity.role) {
                case admin:
                case teacher: {
                    return `SELECT * FROM ta_grade u`
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
                    output.id = item.id;
                    output['grade_meta'] = JSON.parse(item['grade_meta']);
                    outputArray.push(output);
                })
            }
            return outputArray;
        }
    }
}