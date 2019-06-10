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

    initializeCollection = () => {
        let users = db.getCollection('users');
        if(!users) {
            users = db.addCollection('users');
        }
        return users;
    }
}
export default new Users();