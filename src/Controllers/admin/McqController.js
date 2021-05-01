import db from '../../db';
import auth from '../../utils/auth';
import users from '../../users';
import McqModel from '../../Models/McqModel';
import BaseController from '../BaseController';

class McqController extends BaseController {

    GetAll = (req, resp) => {
        console.log('get all mcqs called', req.user);
        // let mcqs = this.initializeCollection();
        // if(req.user && req.user.role === users.UserRoles.admin) {
        //     console.log(mcqs.data.length);
        //     return resp.status(200).send(mcqs.data);
        // }
        // else {
        //     this.GetMcqsByRecruiter(req, resp);
        // }
        let model = new McqModel();
        model.GetAll(req.user)
            .then((res) => {
                console.log('mcq retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }
    
    GetMcqsBySkill = (req, resp) => {
        console.log('get mcqsBySkill called', req.user);
        let { skill } = req.query;
        let model = new McqModel();
        // req.user = {
        //     role: users.UserRoles.admin
        // }
        model.GetMcqsBySkill(req.user, skill)
            .then((res) => {
                console.log('mcq by skill retrieved');
                resp.status(200).send(res);
            })
            .catch((error) => {
                let msg = "Error in fetch MCQs by skill: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            })
    }

    // GetMcqsByRecruiter = (req, resp) => {
    //     console.log('get all mcqs by recruiter called', req.user);
    //     let mcqs = this.initializeCollection();
    //     if(mcqs.data && mcqs.data.length > 0 && req.user) {
    //         let filteredMcqs = mcqs.data.filter((item, index) => {
    //             return item.addedBy = req.user.emailId;
    //         });
    //         console.log(filteredMcqs.length);
    //         return resp.status(200).send(filteredMcqs);
    //     }
    //     resp.status(200).send(mcqs.data);
    // }

    Add = (req, resp) => {
        console.log('Add Mcq called');
        console.log(req.body);
        // let mcqs = this.initializeCollection();
        let { mcq_meta } = req.body;
        let model = new McqModel();
        mcq_meta.createdBy = req.user.id;
        mcq_meta.createdOn = (new Date()).toLocaleDateString();

        model.Add(mcq_meta)
            .then((res) => {
                if(res) {
                    console.log('MCQ Added');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in add MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    BulkMcq = (req, resp) => {
        console.log('Bulk Mcq called');
        console.log(req.body);
        let bulkMcqToAdd = req.body;
        if(req.user) {
            bulkMcqToAdd.addedBy = req.user.emailId;
        }
        let model = new McqModel(); 
        model.BulkAddMcq(bulkMcqToAdd)
            .then((res) => {
                if(res) {
                    console.log('Bulk MCQ Added');
                    resp.status(200).send("Success");
                }  
            })
            .catch((error) => {
                let msg = "Error in Bulk add MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    Update = (req, resp) => {
        console.log('update mcq called');
        console.log(req.body);
        let model = new McqModel(); 
        model.Update(req.body)
            .then((res) => {
                if(res) {
                    console.log('MCQ Updated');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in update MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });

    }

    Delete = (req, resp) => {
        console.log('delete mcq called');
        console.log(req.body);
        let model = new McqModel();
        model.Delete(req.body)
            .then((res) => {
                if(res) {
                    console.log('MCQ Deleted');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in delete MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    
    BulkDelete = (req, resp) => {
        console.log('bulk delete mcq called');
        console.log(req.body);
        let model = new McqModel();
        let { mcqIdsToDelete } = req.body; 
        model.DeleteByIds(mcqIdsToDelete)
            .then((res) => {
                if(res) {
                    console.log('Bulk MCQ Deleted');
                    resp.status(200).send('success');
                }  
            })
            .catch((error) => {
                let msg = "Error in delete MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

}

export default new McqController();