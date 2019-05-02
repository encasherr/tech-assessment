import db from '../../db';

class CategoryController {
    GetAll = (req, resp) => {
        console.log('get all categories called');
        let categories = this.initializeCollection();
        console.log(categories.data.length);
        resp.send(categories.data);
    }

    Add = (req, resp) => {
        console.log('Add Category called');
        console.log(req.body);
        let categories = this.initializeCollection();
        categories.insert(req.body);
        db.saveDatabase();
        resp.send(JSON.stringify(req.body));
    }

    Update = (req, resp) => {
        console.log('update category called');
        console.log(req.body);
        let categories = this.initializeCollection();
        let categoryToUpdate = categories.find({ '$loki': req.body.$loki });
        if(categoryToUpdate && categoryToUpdate.length > 0) {
            categoryToUpdate[0].title = req.body.title;
            categoryToUpdate[0].description = req.body.description;
            categories.update(categoryToUpdate[0]);
        }
        else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
    }

    initializeCollection = () => {
        let categories = db.getCollection('categories');
        if(!categories) {
            categories = db.addCollection('categories');
        }
        return categories;
    }
}

export default new CategoryController();