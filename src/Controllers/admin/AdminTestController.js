import db from '../../db';

class AdminTestController {
    GetAll = (req, resp) => {
        console.log('get all tests called');
        let tests = this.initializeCollection();
        console.log(tests.data.length);
        resp.send(tests.data);
    }

    GetTest = (req, resp) => {
        let testId = req.query.testId;
        console.log('get test called: ' + testId);
        let tests = this.initializeCollection();
        // let test = tests.findOne({ '$loki': testId });
        let filteredTests = tests.where((item) => {
            console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
            return item['$loki'] == testId;    
        });

        console.log(filteredTests[0]);
        resp.send(filteredTests[0]);
    }

    Add = (req, resp) => {
        console.log('Add Test called');
        let tests = this.initializeCollection();
        let test = tests.insert(req.body);
        db.saveDatabase();
        console.log(test);
        resp.send(test);
    }

    Update = (req, resp) => {
        console.log('update test called');
        console.log(req.body);
        let tests = this.initializeCollection();
        let categoryToUpdate = tests.find({ '$loki': req.body.$loki });
        if(categoryToUpdate && categoryToUpdate.length > 0) {
            categoryToUpdate[0].title = req.body.title;
            categoryToUpdate[0].description = req.body.description;
            tests.update(categoryToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete test called');
        resp.send('delete test called');
    }

    initializeCollection = () => {
        let tests = db.getCollection('tests');
        if(!tests) {
            tests = db.addCollection('tests');
        }
        return tests;
    }
}

export default new AdminTestController();