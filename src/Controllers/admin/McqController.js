import db from '../../db';
import auth from '../../utils/auth';
import users from '../../users';
import McqModel from '../../McqModel';

class McqController {
    //Model = {};
    constructor() {
        //this.Model = new McqModel();
    }

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
                if(res) {
                    resp.status(200).send(res);
                }
            })
            .catch((error) => {
                let msg = "Error in fetch MCQ: " + error;
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
        let mcqToAdd = req.body;
        if(req.user) {
            mcqToAdd.addedBy = req.user.emailId;
        }
        let model = new McqModel(); 
        model.Add(mcqToAdd)
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
        // mcqs.insert(mcqToAdd);
        // db.saveDatabase();
        // resp.send(JSON.stringify(req.body));
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
        // let mcqs = this.initializeCollection();
        // let mcqToUpdate = mcqs.find({ '$loki': req.body.$loki });
        // if(mcqToUpdate && mcqToUpdate.length > 0) {
        //     mcqToUpdate[0].title = req.body.title;
        //     mcqToUpdate[0].description = req.body.description;
        //     if(req.user) {
        //         mcqToUpdate[0].updatedBy = req.user.emailId;
        //     }
        //     mcqs.update(mcqToUpdate[0]);
        // }
        // else {
        //     console.log('nothing to update');
        // }
        // console.log(mcqToUpdate);
        // resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete mcq called');
        
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

    // initializeCollection = () => {
    //     let mcqs = db.getCollection('mcqs');
    //     if(!mcqs) {
    //         mcqs = db.addCollection('mcqs');
    //     }
    //     return mcqs;
    // }
}

export default new McqController();