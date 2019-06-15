import db from '../../db';
import auth from '../../utils/auth';
import users from '../../users';

class McqController {
    GetAll = (req, resp) => {
        console.log('get all mcqs called', req.user);
        let mcqs = this.initializeCollection();
        if(req.user && req.user.role === users.UserRoles.admin) {
            console.log(mcqs.data.length);
            return resp.status(200).send(mcqs.data);
        }
        else {
            this.GetMcqsByRecruiter(req, resp);
        }
    }
    
    GetMcqsByRecruiter = (req, resp) => {
        console.log('get all mcqs by recruiter called', req.user);
        let mcqs = this.initializeCollection();
        if(mcqs.data && mcqs.data.length > 0 && req.user) {
            let filteredMcqs = mcqs.data.filter((item, index) => {
                return item.addedBy = req.user.emailId;
            });
            console.log(filteredMcqs.length);
            return resp.status(200).send(filteredMcqs);
        }
        resp.status(200).send(mcqs.data);
    }

    Add = (req, resp) => {
        console.log('Add Mcq called');
        console.log(req.body);
        let mcqs = this.initializeCollection();
        let mcqToAdd = req.body;
        if(req.user) {
            mcqToAdd.addedBy = req.user.emailId;
        }
        mcqs.insert(mcqToAdd);
        db.saveDatabase();
        resp.send(JSON.stringify(req.body));
    }

    Update = (req, resp) => {
        console.log('update mcq called');
        console.log(req.body);
        let mcqs = this.initializeCollection();
        let mcqToUpdate = mcqs.find({ '$loki': req.body.$loki });
        if(mcqToUpdate && mcqToUpdate.length > 0) {
            mcqToUpdate[0].title = req.body.title;
            mcqToUpdate[0].description = req.body.description;
            if(req.user) {
                mcqToUpdate[0].updatedBy = req.user.emailId;
            }
            mcqs.update(mcqToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(mcqToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete mcqs called');
        resp.send('delete mcqs called');
    }

    initializeCollection = () => {
        let mcqs = db.getCollection('mcqs');
        if(!mcqs) {
            mcqs = db.addCollection('mcqs');
        }
        return mcqs;
    }
}

export default new McqController();