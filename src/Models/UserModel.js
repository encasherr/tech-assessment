// import db from './db';
import db from '../db/mysqldb';
import users from '../users';
import queries from '../db/queries';

import { GetQueryConfig, 
    HandlePromise } from '../commons/RoleDefinitions';
import { VIEW_USERS } from '../commons/RoleBasedQueries/UserQueries';
import { getSiteUrl, encrypt, decrypt } from '../utils/general';
import EmailHelper from '../commons/EmailHelper';
import { EmailConfig } from '../commons/ServerConfig';

class UserModel {
    entityName = 'users';
    entities = {};
    
    
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

    Add = (entity) => {
        return new Promise((resolve, reject) => {
            db.insert(this.entityName, entity).then((insertId) => {
                resolve(insertId);
            })
            .catch((err) => {
                reject(err);
            })
        });
    }

    Update = (entity) => {
        entity.user_meta.modifiedOn = (new Date()).toLocaleDateString();
        return new Promise((resolve, reject) => {
            db.update(this.entityName, entity.user_meta, entity.id).then((res) => {
                resolve(res);
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
        let userEntity = await this.GetUser(userId);
        let userDetail = {
            userId: userId, 
            email: userEntity.user_meta.emailId,
            name: userEntity.user_meta.name
        }
        let encryptedObject = encrypt(`${userDetail.userId}`); 
        console.log('encryptedObject in model: ', encryptedObject);
        let verificationLink = EmailConfig.getVerificationLink(await getSiteUrl(), encryptedObject);
        console.log('verification link: ', verificationLink);
        let emailInfo = {
            to: userDetail.email,
            subject: `Welcome - Verify user email`,
            user_name: userEntity.user_meta.name,
            verification_link: verificationLink,
            notificationType: 'verify_user_email'
        };
        let emailHelper = new EmailHelper();
        emailHelper.SendEmail(emailInfo);
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