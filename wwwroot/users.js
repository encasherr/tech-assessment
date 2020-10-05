'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function Users() {
    var _this = this;

    _classCallCheck(this, Users);

    this.GetAll = function () {
        console.log('get all users called');
        var users = _this.initializeCollection();
        console.log(users.data.length);
        return users.data;
    };

    this.Add = function (userObj) {
        console.log('Add User called');
        console.log(userObj);
        var users = _this.initializeCollection();
        users.insert(userObj);
        console.log('user added', userObj.emailId);
    };

    this.GetUser = function (email) {
        var users = _this.initializeCollection();
        var user = users.find({ 'emailId': email });
        if (user && user.length > 0) {
            console.log('user found', user[0]);
            return user[0];
        }
        return null;
    };

    this.UpdateUser = function (emailId, newEntity) {
        var users = _this.initializeCollection();
        var filteredUsers = users.where(function (item) {
            //console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
            return item['emailId'] == emailId;
        });
        console.log('updating', emailId);
        if (filteredUsers && filteredUsers.length > 0) {
            var userToUpdate = filteredUsers[0];

            var entityToUpdate = _this.replaceEntity(userToUpdate, newEntity);
            users.update(entityToUpdate);
            // db.saveDatabase(() => {
            //     this.EmailSnapshot('CategoryAdd');
            // });

            console.log('user updated');
            return entityToUpdate;
        } else {
            console.log('nothing to update');
            return null;
        }
    };

    this.DeleteUser = function (emailId) {
        var users = _this.initializeCollection();
        var userToDelete = users.where(function (item) {
            return item['emailId'] == emailId;
        });
        if (userToDelete && userToDelete.length > 0) {
            users.remove(userToDelete[0]);
            _db2.default.saveDatabase(function () {
                _this.EmailSnapshot('CategoryAdd');
            });

            console.log('user deleted', emailId);
        }
    };

    this.UserRoles = {
        recruiter: 'recruiter',
        admin: 'admin',
        candidate: 'candidate',
        guest: 'guest',
        recruiteradmin: 'recruiteradmin'
    };

    this.replaceEntity = function (oldEntity, newEntity) {
        if (oldEntity != null) {
            for (var property in newEntity) {
                if (newEntity.hasOwnProperty(property) && property !== "$loki" && property !== 'meta') {
                    oldEntity[property] = newEntity[property];
                }
            }
        }
        return oldEntity;
    };

    this.initializeCollection = function () {
        var users = _db2.default.getCollection('users');
        if (!users) {
            users = _db2.default.addCollection('users');
        }
        return users;
    };
};

exports.default = new Users();
//# sourceMappingURL=users.js.map