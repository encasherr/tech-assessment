import db from '../../db';
import userModel from '../../users';

class UserController {

    GetAll = (req, resp) => {
        let allusers = userModel.GetAll();
        resp.status(200).send(allusers);
    }

    Add = (req, resp)=>{
        let userObj=req.body.user;
        let dbuser=userModel.Add(userObj);
        resp.status(200).send(dbuser);
    }

    Update = (req,resp)=>{
        let userObj = req.body.user;
        let dbuser = userModel.UpdateUser(userObj);
        resp.status(200).send(dbuser);
    }

}
export default new UserController();
