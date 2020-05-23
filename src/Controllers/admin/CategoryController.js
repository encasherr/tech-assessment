import BaseController from '../BaseController';
// import db from '../../db';
import db from '../../db/mysqldb';
import EmailHelper from '../../commons/EmailHelper';
import { DbConfig } from '../../commons/ServerConfig';

class CategoryController extends BaseController {
    entityName = 'categories';
    categories = {};

    GetAll = (req, resp) => {
        console.log('get all categories called');
        // let categories = this.initializeCollection();
        this.initializeCollection().then((res) => {
            console.log('initialized');
            resp.send(this.categories.data);
        }).catch((err) => {
            var obj = { status: 500, message: err };
            resp.status(500).send(obj);
        });
        // console.log(this.categories.data.length);

        //resp.send(categories.data);
    }

    Add = (req, resp) => {
        console.log('Add Category called');
        console.log(req.body);
        db.insert(this.entityName, req.body.category_meta);
        resp.send(JSON.stringify(req.body));
        // let categories = this.initializeCollection();
        // this.initializeCollection().then((res) => {
        //     this.categories.insert(req.body);
        //     // this.EmailSnapshot('CategoryAdd');
        //     // db.saveDatabase(() => {
        //     //     this.EmailSnapshot('CategoryAdd');
        //     // });
        //     resp.send(JSON.stringify(req.body));
        // })

    }

    Update = (req, resp) => {
        console.log('update category called');
        console.log(req.body);
        // let categories = this.initializeCollection();
        db.update(this.entityName, req.body.category_meta, req.body.id);
        resp.send(JSON.stringify(req.body));
         // this.initializeCollection((res) => {

        //     this.categories.findById(req.body.id).then((res) => {
        //         console.log('findbyid result', res);
        //         if(res && res.length > 0){
        //             let categoryToUpdate = res[0];
        //             console.log('categoryToUpdate', categoryToUpdate);
        //             categoryToUpdate.category_meta = req.body;
        //             // categoryToUpdate.title = req.body.title;
        //             // categoryToUpdate.description = req.body.description;
        //             this.categories.update(categoryToUpdate, categoryToUpdate.id);
        //             console.log(categoryToUpdate);
        //         }
        //         else {
        //             console.log('nothing to update');
        //         }
        //         resp.send(JSON.stringify(req.body)); 
        //     });
        //     // let categoryToUpdate = categories.find({ '$loki': req.body.$loki });
            // if(categoryToUpdate && categoryToUpdate.length > 0) {
            //     categoryToUpdate[0].title = req.body.title;
            //     categoryToUpdate[0].description = req.body.description;
            //     categories.update(categoryToUpdate[0], categoryToUpdate.id);
            //     // categories.update(categoryToUpdate[0]);
            // }
            // else {
            //     console.log('nothing to update');
            // }
            // console.log(categoryToUpdate);
            // resp.send(JSON.stringify(req.body));
        //})
    }

    Delete = (req, resp) => {
        console.log('delete category called');
        console.log(req.body);
        db.delete(this.entityName, req.body.id);
        resp.status(200).send('success');
    }

    /*initializeCollection = () => {
        let categories = db.getCollection('categories');
        if(!categories) {
            categories = db.addCollection('categories');
        }
        return categories;
    }*/

    initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    // console.log('fetched all categories', res);
                    this.categories = res;
                    resolve(this.categories);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
    }
}

export default new CategoryController();