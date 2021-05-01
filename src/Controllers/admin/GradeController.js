import BaseController from '../BaseController';
import GradeModel from '../../Models/OnlinePortal/GradeModel';

class GradeController extends BaseController {

    GetAll = (req, resp) => {
        console.log('get all grades called');
        let gradeModel = new GradeModel();
        gradeModel.GetAll(req.user)
            .then((res) => {
                console.log('returned all grades');
                resp.send(res);
            }).catch((err) => {
                console.log(`Error in Get All Grades: ${err}`)
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });

    }

    Add = (req, resp) => {
        console.log('Add grade called');
        console.log(req.body);
        let { grade_meta } = req.body;
        
        let gradeModel = new GradeModel();
        gradeModel.Add(grade_meta)
            .then((res) => {
                resp.send({ message: 'success' });
            }).catch((err) => {
                console.log(`Error in Add Grade: ${err}`)
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });
        // let skills = this.initializeCollection();
        // skills.insert(req.body);
        // db.saveDatabase(() => {
        //     this.EmailSnapshot('CategoryAdd');
        // });

    }

    Update = (req, resp) => {
        console.log('update Grade called');
        console.log(req.body);
        let model = new GradeModel(); 
        model.Update(req.body)
            .then((res) => {
                if(res) {
                    console.log('Grade Updated');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in update Grade: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });

    }

    Delete = (req, resp) => {
        console.log('delete grade called');
        console.log(req.body);
        let gradeModel = new GradeModel();
        gradeModel.Delete(entity)
        .then((res) => {
            resp.send('success');
        }).catch((err) => {
            console.log(`Error in Delete Grade: ${err}`)
            var obj = { status: 500, message: err };
            resp.status(500).send(obj);
        });
    }
    // initializeCollection = () => {
    //     let skills = db.getCollection('skills');
    //     if(!skills) {
    //         skills = db.addCollection('skills');
    //     }
    //     return skills;
    // }
    // initializeCollection = () => {
    //     var promise = new Promise((resolve, reject) => {
    //         db.getCollection(this.entityName)
    //             .then((res) => {
    //                 this.skills = res;
    //                 resolve(this.skills);
    //             }).catch((err) => {
    //                 console.log('error occurred: ', err);
    //                 reject(err);
    //             })
    //     });
    //     return promise;
    // }
}

export default new GradeController();