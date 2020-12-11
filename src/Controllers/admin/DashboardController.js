import db from '../../db';
import userModel from '../../users';
import BaseController from '../BaseController';
import DashboardModel from '../../Models/DashboardModel';

class DashboardController extends BaseController {

    GetAllStatistics = (req, resp) => {
        req.user = {
            id: 2, role: 'admin', orgId: 3, name: 'Encasherr'
        }
        console.log('get all statistics called', req.user);
        
        let model = new DashboardModel();
        model.GetAllStatistics(req.user)
            .then((res) => {
                console.log('statistics fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching statistics: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    GetTestCount = (req, resp) => {
        let model = new DashboardModel();
        model.GetTestCount(req.user)
            .then((res) => {
                console.log('test count fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching test count: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    GetMcqCount = (req, resp) => {
        let model = new DashboardModel();
        model.GetMcqCount(req.user)
            .then((res) => {
                console.log('mcq count fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching mcq count: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    GetInvitationCount = (req, resp) => {
        let model = new DashboardModel();
        model.GetInvitationCount(req.user)
            .then((res) => {
                console.log('invitation count fetched');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching invitation count: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

}
export default new DashboardController();
