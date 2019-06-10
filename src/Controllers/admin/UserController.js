import db from '../../db';
import userModel from '../../users';

class UserController {

 GetAllUsers = (req, resp) => {
  let allusers = userModel.GetAll();
  resp.status(200).send(allusers);
 }

AddUser = (req, resp)=>{
let userObj=req.body.user;
let dbuser=userModel.Add(userObj);
resp.status(200).send(dbuser);
}

UpdateUser = (req,resp)=>{
  let userObj = req.body.user;
  let dbuser = userModel.UpdateUser(userObj);
  resp.status(200).send(dbuser);
}

}
export default new UserController();
