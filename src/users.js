import db from './db';

class Users {

    GetAll = () => {
        console.log('get all users called');
        let users = this.initializeCollection();
        console.log(users.data.length);
        return users.data;
    }

    Add = (userObj) => {
        console.log('Add User called');
        console.log(userObj);
        let users = this.initializeCollection();
        users.insert(userObj);
        db.saveDatabase();
        console.log('user added', userObj.emailId);
    }

    GetUser = (email) => {
        let users = this.initializeCollection();
        let user = users.find({ 'emailId': email });
        if(user && user.length > 0) {
            console.log('user found', user[0]);
            return user[0];
        }
        return null;
    }

    UpdateUser = (emailId, newEntity) => {
        let users = this.initializeCollection();
        let filteredUsers = users.where((item) => {
            //console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
            return item['emailId'] == emailId;    
        });
        console.log(emailId);
        if(filteredUsers && filteredUsers.length > 0) {
            let userToUpdate = filteredUsers[0];
            
            let entityToUpdate = this.replaceEntity(userToUpdate, newEntity);
            users.update(entityToUpdate);
            db.saveDatabase();
            return entityToUpdate;
        }
        else {
            console.log('nothing to update');
            return null;
        }
    }

    replaceEntity = (oldEntity, newEntity) => {
        if(oldEntity != null){
            for (var property in newEntity) {
                if (newEntity.hasOwnProperty(property) && property !== "$loki" && property !== 'meta') {
                    oldEntity[property] = newEntity[property];
                }
            }
        }
        return oldEntity;
    }

    initializeCollection = () => {
        let users = db.getCollection('users');
        if(!users) {
            users = db.addCollection('users');
        }
        return users;
    }
}
export default new Users();
