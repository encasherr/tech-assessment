import db from '../../db';
import userModel from '../../users';

class UserController {

    GetAll = (req, resp) => {
        let allusers = userModel.GetAll();
        resp.status(200).send(allusers);
    }

    Add = (req, resp)=>{
        console.log('add user called');
        let userObj=req.body.user;
        let dbuser=userModel.Add(userObj);
        resp.status(200).send(dbuser);
    }

    Update = (req, resp)=>{
        console.log('update user called');
        let userObj = req.body.user;
        let dbuser = userModel.UpdateUser(userObj.emailId, userObj);
        resp.status(200).send(dbuser);
    }

    Delete = (req, resp) => {
        console.log('delete user called');
        let userObj = req.body.user;
        userModel.DeleteUser(userObj.emailId);
        resp.status(200).send('success');
    }

}
export default new UserController();
