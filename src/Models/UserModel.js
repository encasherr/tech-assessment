// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

import { candidate, GetQueryConfig, 
    HandlePromise, 
    student} from '../commons/RoleDefinitions';
import { VIEW_USERS } from '../commons/RoleBasedQueries/UserQueries';
import { getSiteUrl, encrypt, decrypt,
    comparePasswordHash, 
    createPasswordHash} from '../utils/general';
import EmailHelper from '../commons/EmailHelper';
import { EmailConfig } from '../commons/ServerConfig';
import { getCurrentDateTime } from '../commons/HelperFunctions';
import DbConfig from '../commons/DbConfig';
import CandidateModel from './CandidateModel';

class UserModel {
    entityName = 'users';
    entities = {};
    
    constructor() {
    }
    
    GetAll = (userEntity) => {
        let queryConfig = GetQueryConfig(VIEW_USERS);
        return HandlePromise(db, queryConfig, userEntity);
    }

    GetUser = (userId) => {
        return new Promise((resolve, reject) => {
            db.findOne(this.entityName, userId).then((res) => {
                resolve(res);
            });
        })
    }

    GetUserByEmail = (emailId) => {
        return new Promise((resolve, reject) => {
            let sql = queries.getUserByEmailIdQuery(emailId);
            db.executeQuery(sql).then((res) => {
                resolve(res);
            });
        })
    }

    CheckUserCredentials = (emailId, password) => {
        return new Promise((resolve, reject) => {
            let sql = queries.checkUserCredentials(emailId);
            db.executeQuery(sql).then((res) => {
                if(res && res.length > 0) {
                    let userRow = res[0];
                    console.log('userRow', userRow);
                    let compareResult = comparePasswordHash(password, userRow.password);
                    console.log('compareResult', compareResult);
                    if(compareResult) {
                        resolve(res[0]);
                    }
                    else {
                        resolve(null);
                    }
                }
                else {
                    resolve(null);
                }
            })
            .catch((err) => {
                reject(err);
            });
        })
    }

    ChangePassword = (currentPassword, password, userEntity) => {
        return new Promise(async (resolve, reject) => {
            let currentUser = await this.CheckUserCredentials(userEntity.emailId, currentPassword);
            if(currentUser) {
                let newPassword = createPasswordHash(password);
                let sql = `update ta_users set password = '${newPassword}' where id = ${userEntity.id}`;
                db.executeQuery(sql)
                    .then((res) => {
                        resolve(true);
                    })
            }
            else {
                reject('Current password is invalid');
            }
        })
    }

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity)
                .then(async (insertId) => {
                    if(insertId) {
                        await this.CreateCandidateOrStudent(insertId);
                        resolve(insertId);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    AddCustom = (entity) => {
        return new Promise((resolve, reject) => {
            db.insertCustom(this.entityName, entity)
                .then(async (insertId) => {
                    if(insertId) {
                        await this.CreateCandidateOrStudent(insertId);
                        resolve(insertId);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    CreateCandidateOrStudent = async (userId) => {
        let userToAdd = await this.GetUser(userId);
        if(userToAdd.user_meta.role === candidate || userToAdd.user_meta.role === student) {
            let candidateModel = new CandidateModel();
            let candEntity = {
                candidate_meta : {
                    name: userToAdd.user_meta.name,
                    email: userToAdd.user_meta.emailId
                },
                user_id: userId
            }
            await candidateModel.AddCandidate(candEntity);
        }
    }

    Update = (entity) => {
        entity.user_meta.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.user_meta, entity.id).then((res) => {
                resolve(res);
            });
        });
    }

    UpdateCustom = (entity) => {
        entity.user_meta.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.updateCustom(this.entityName, entity, entity.id)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    Delete = (entity) => {
        return new Promise((resolve, reject) => {
            db.delete(this.entityName, entity.id);
            resolve(entity.user_meta);
        });
    }

    VerifyUser = async (userIv, userContent) => {
        let userId = decrypt(userIv, userContent);
        console.log('decryption result: ', userId);
        if(userId) {
            let userEntity = await this.GetUser(userId);
            return userEntity;
        }
        return null;
    }

    SendVerificationEmail = async (userId) => {
        let dbConfig = new DbConfig();
        let KeyValues = await dbConfig.Initialize();
        let siteUrl = KeyValues ? (KeyValues.site_url ? KeyValues.site_url : '') : '';
        let userEntity = await this.GetUser(userId);
        let userDetail = {
            userId: userId, 
            email: userEntity.user_meta.emailId,
            name: userEntity.user_meta.name
        }
        let encryptedObject = encrypt(`${userDetail.userId}`); 
        console.log('encryptedObject in model: ', encryptedObject);
        let verificationLink = EmailConfig.getVerificationLink(siteUrl, encryptedObject);
        console.log('verification link: ', verificationLink);
        let emailInfo = {
            to: userDetail.email,
            subject: `Welcome - Verify user email`,
            user_name: userEntity.user_meta.name,
            verification_link: verificationLink,
            notificationType: 'verify_user_email'
        };
        let emailHelper = new EmailHelper();
        emailHelper.SendEmail(emailInfo)
                .then(() => {
                    let entityToUpdate = {...userEntity};
                    entityToUpdate.user_meta.emailStatus = `Verification Email Sent on ${getCurrentDateTime()}`;
                    this.Update(entityToUpdate);
                })
                .catch((err) => {
                    let entityToUpdate = {...userEntity};
                    entityToUpdate.user_meta.emailStatus = `Email Sending Failed`;
                    this.Update(entityToUpdate);
                })
    }

    /*initializeCollection = () => {
        var promise = new Promise((resolve, reject) => {
            db.getCollection(this.entityName)
                .then((res) => {
                    this.entities = res;
                    resolve(this.entities);
                }).catch((err) => {
                    console.log('error occurred: ', err);
                    reject(err);
                })
        });
        return promise;
    }*/
}
export default UserModel;