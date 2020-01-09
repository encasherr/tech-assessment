import db from '../../db';

class RmaRequestController {
    GetAll = (req, resp) => {
        console.log('get all rma requests called');
        let rmaRequests = this.initializeCollection();
        console.log(rmaRequests.data.length);
        resp.send(rmaRequests.data);
    }

    Add = (req, resp) => {
        console.log('Add rma request called');
        console.log(req.body);
        let rmaRequests = this.initializeCollection();
        rmaRequests.insert(req.body);
        db.saveDatabase();
        resp.send(JSON.stringify(req.body));
    }

    Update = (req, resp) => {
        console.log('update rmaRequests called');
        console.log(req.body);
        let rmaRequests = this.initializeCollection();
        let rmaRequestToUpdate = rmaRequests.find({ '$loki': req.body.$loki });
        if(rmaRequestToUpdate && rmaRequestToUpdate.length > 0) {
            //categoryToUpdate[0].title = req.body.title;
            //categoryToUpdate[0].description = req.body.description;
            //categories.update(categoryToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        //console.log('get all mcqs called');
        //resp.send('get all mcqs called');
    }

    initializeCollection = () => {
        let rmaRequests = db.getCollection('rmaRequests');
        if(! rmaRequests) {
            rmaRequests = db.addCollection('rmaRequests');
        }
        return rmaRequests;
    }
}

export default new RmaRequestController
