import db from '../../db/mysqldb';
import BaseController from '../BaseController';
import OrgModel from '../../Models/OrgModel';

class OrgController extends BaseController {

    GetAll = (req, resp) => {
        console.log('get all orgs called');
        let model = new OrgModel();
        
        model.GetAll(req.user).then((res) => {
            console.log('fetched orgs');
            resp.status(200).json(res);
        }).catch((err) => {
            console.log('Exception in fetching orgs: ' + err);
            var obj = { status: 500, message: err };
            resp.status(500).json(obj);
        });

    }

    Add = (req, resp) => {
        console.log('Add org called');
        console.log(req.body);
        let { org_meta } = req.body;
        let model = new OrgModel();
        model.Add(org_meta)
                .then((orgId) => {
                    resp.status(200).send('success');
                })
                .catch((err) => {
                    resp.status(500).json({message: err});  
                });

    }

    Update = (req, resp) => {
        console.log('Update Org called');
        console.log(req.body);
        let entity = req.body;
        let model = new OrgModel();
        model.Update(entity)
                .then((orgId) => {
                    resp.status(200).send('success');
                })
                .catch((err) => {
                    resp.status(500).json({message: err});  
                });
    }

    Delete = (req, resp) => {
        console.log('delete org called');
        console.log(req.body);
        let entity = req.body;
        let model = new OrgModel();
        model.Delete(entity)
                .then((orgId) => {
                    resp.status(200).send('success');
                })
                .catch((err) => {
                    resp.status(500).json({message: err});  
                });
    }

}

export default new OrgController();