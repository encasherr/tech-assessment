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
                console.log('data returned', data);
                let invitationCount = data[0];
                let testCount = data[1];
                let mcqCount = data[2];
    
                let statistics = {
                    invitationCount,
                    testCount,
                    mcqCount
                }
                resolve(statistics);
            })
            .catch((err) => {
                reject(err);  
            });
        })
    }

    GetTestCount = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_DASHBOARD_TESTS_COUNT);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetMcqCount = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_DASHBOARD_MCQ_COUNT);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetInvitationCount = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_DASHBOARD_INVITATION_COUNT);
        return HandlePromise(db, queryConfig, userEntity);
    }

}
export default DashobardModel;