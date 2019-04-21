import db from '../../db';

class McqController {
    GetAll = (req, resp) => {
        console.log('get all mcqs called');
        let mcqs = this.initializeCollection();
        console.log(mcqs.data.length);
        resp.send(mcqs.data);
    }

    Add = (req, resp) => {
        console.log('Add Mcq called');
        console.log(req.body);
        let mcqs = this.initializeCollection();
        mcqs.insert(req.body);
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
            mcqs.update(mcqToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(mcqToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
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