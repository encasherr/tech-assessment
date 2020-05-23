// import db from '../../db';
import db from '../../db/mysqldb';
import BaseController from '../BaseController';

class SkillController extends BaseController {
    entityName = 'skills';
    skills = {};

    GetAll = (req, resp) => {
        console.log('get all skills called');
        // let skills = this.initializeCollection();
        // console.log(skills.data.length);
        // resp.send(skills.data);
        this.initializeCollection().then((res) => {
            console.log('initialized');
            resp.send(this.skills.data);
        }).catch((err) => {
            var obj = { status: 500, message: err };
            resp.status(500).send(obj);
        });

    }

    Add = (req, resp) => {
        console.log('Add skill called');
        console.log(req.body);
        db.insert(this.entityName, req.body.skill_meta);
        
        // let skills = this.initializeCollection();
        // skills.insert(req.body);
        // db.saveDatabase(() => {
        //     this.EmailSnapshot('CategoryAdd');
        // });

        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete skill called');
        console.log(req.body);
        db.delete(this.entityName, req.body.id);
        resp.status(200).send('success');
    }
    // initializeCollection = () => {
    //     let skills = db.getCollection('skills');
    //     if(!skills) {
    //         skills = db.addCollection('skills');
    //     }
    //     return skills;
    // }
    initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    this.skills = res;
                    resolve(this.skills);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
    }
}

export default new SkillController();