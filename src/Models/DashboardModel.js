import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

import { GetQueryConfig, 
        HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_DASHBOARD_INVITATION, VIEW_DASHBOARD_TESTS, VIEW_DASHBOARD_MCQ, 
    VIEW_DASHBOARD_INVITATION_COUNT,
    VIEW_DASHBOARD_TESTS_COUNT, VIEW_DASHBOARD_MCQ_COUNT } from '../commons/RoleBasedQueries/DashboardQueries';


class DashobardModel {
    
    GetAllStatistics = (userEntity) => {
        let promises = [];

        console.log('getting invitations');
        let queryConfig = GetQueryConfig(VIEW_DASHBOARD_INVITATION_COUNT);
        promises.push(HandlePromise(db, queryConfig, userEntity));

        console.log('getting tests');
        queryConfig = GetQueryConfig(VIEW_DASHBOARD_TESTS_COUNT);
        promises.push(HandlePromise(db, queryConfig, userEntity));

        console.log('getting mcqs');
        queryConfig = GetQueryConfig(VIEW_DASHBOARD_MCQ_COUNT);
        promises.push(HandlePromise(db, queryConfig, userEntity));

        return new Promise((resolve, reject) => {
            Promise.all(promises).then((data) => {
                console.log('data returned');
                let invitationData = data[0];
                let testData = data[1];
                let mcqData = data[2];
    
                let statistics = {
                    invitationData,
                    testData,
                    mcqData
                }
                resolve(statistics);
            })
            .catch((err) => {
                reject(err);  
            });
        })
    }

}
export default DashobardModel;