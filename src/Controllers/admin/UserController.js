import db from '../../db';
import userModel from '../../users';
import BaseController from '../BaseController';
import UserModel from '../../Models/UserModel';
import DbConfig from '../../commons/DbConfig';

class UserController extends BaseController {

    LoadConfig = (req, resp) => {
        let dbConfig = new DbConfig();
        dbConfig.Initialize().then((KeyValues) => {
            resp.status(200).json(KeyValues);
        }).catch((err) => {
            resp.status(500).json({message: 'Exception in loading config: ' + err});
        })
    }

    GetAll = (req, resp) => {
        console.log('get all users called', req.user);
        
        let model = new UserModel();
        model.GetAll(req.user)
            .then((res) => {
                console.log('users retrieved');
                resp.status(200).json(res);
            })
            .catch((error) => {
                let msg = "Error in fetching users: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    Add = (req, resp)=>{
        console.log('add user called');
        // let userObj=req.body.user;
        // let dbuser=userModel.Add(userObj);
        // resp.status(200).send(dbuser);
        console.log(req.body);
        let userToAdd = req.body;
        userToAdd = req.body.user_meta;
        
        userToAdd.createdBy = req.user.id;
        userToAdd.createdOn = (new Date()).toLocaleDateString();

        let model = new UserModel(); 
        model.Add(userToAdd)
            .then((res) => {
                if(res) {
                    console.log('User Added');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in adding User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    Update = (req, resp)=>{
        console.log('update user called');
        // let userObj = req.body.user;
        // let dbuser = userModel.UpdateUser(userObj.emailId, userObj);
        // resp.status(200).send(dbuser);
        console.log(req.body);
        let model = new UserModel(); 
        model.Update(req.body)
            .then((res) => {
                if(res) {
                    console.log('User Updated');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in updating User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

    Delete = (req, resp) => {
        console.log('delete user called');
        console.log(req.body);
        // let userObj = req.body.user;
        // userModel.DeleteUser(userObj.emailId);
        // resp.status(200).send('success');
        let model = new UserModel(); 
        model.Delete(req.body)
            .then((res) => {
                if(res) {
                    console.log('User deleted');
                    resp.status(200).send(JSON.stringify(req.body));
                }  
            })
            .catch((error) => {
                let msg = "Error in deleting User: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
    }

}
export default new UserController();
