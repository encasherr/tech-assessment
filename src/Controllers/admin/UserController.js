import db from '../../db';
import userModel from '../../users';
import BaseController from '../BaseController';
import UserModel from '../../Models/UserModel';
import DbConfig from '../../commons/DbConfig';
import { encrypt, getHomePagePath, getSiteUrl } from '../../utils/general';
import path from 'path';

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

    AddNewUserToBeVerified = async (req, resp) => {
        console.log('new user to be confirmed called');
        console.log(req.body);
        let userToAdd = req.body.user_meta;
        
        userToAdd.createdBy = 'self';
        userToAdd.status = 'pending verification';
        userToAdd.createdOn = (new Date()).toLocaleDateString();

        let verificationLink = '';

        let model = new UserModel(); 
        let userId = await model.Add(userToAdd)
        .catch((err) => {
            let msg = "Error while adding User: " + error;
            console.log(msg);
            resp.status(500).send(msg);
        })
            // .then((res) => {
                if(userId) {
                    console.log('User Added, Id: ', userId);
                    await model.SendVerificationEmail(userId)
                    .catch((err) => {
                        let msg = "Error while sending email: " + err;
                        console.log(msg);
                        resp.status(500).send(msg);
                    });
                    resp.status(200).send(JSON.stringify(userToAdd));
                } else { 
            // })
            // .catch((error) => {
                    let msg = "Could not add user. Try after some time";
                    console.log(msg);
                    resp.status(500).send(msg);
                }
            // });
    }

    VerifyUser = async (req, resp) => {
        console.log('Verify user called');
        console.log(req.query);
        let { userIv, userContent } = req.query;
        console.log('calling decrypt on ', userIv, userContent);
        let model = new UserModel();
        let userToUpdate = await model.VerifyUser(userIv, userContent)
        .catch((err) => {
            let msg = 'User not found or verification link expired. Please sign up again to use the website.'
            resp.status(200).send(msg);
            return;
        });
        if(userToUpdate && userToUpdate.user_meta) {
            userToUpdate.user_meta.status = 'verified'; 
        }
        else {
            let msg = 'User not found or verification link expired. Please sign up again to use the website.'
            resp.status(200).send(msg);
            return;
        }
        model.Update(userToUpdate)
            .then(async (res) => {
                if(res) {
                    let homePage = getHomePagePath();
                    let fileName = homePage;
                    // resp.sendFile(fileName);
                    let url = `${await getSiteUrl()}emailVerified`;
                    console.log('User Updated, redirecting to ', url);
                    // resp.writeHead(301,
                    //     { Location: url }
                    //   );
                    resp.redirect(url);
                }  
            })
            .catch((error) => {
                let msg = "Error in updating User: " + error;
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
