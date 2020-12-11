'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _users = require('../users');

var _users2 = _interopRequireDefault(_users);

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _RoleDefinitions = require('../commons/RoleDefinitions');

var _UserQueries = require('../commons/RoleBasedQueries/UserQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from './db';


var UserModel =

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
function UserModel() {
    var _this = this;

    _classCallCheck(this, UserModel);

    this.entityName = 'users';
    this.entities = {};

    this.GetAll = function (userEntity) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_UserQueries.VIEW_USERS);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, userEntity);
    };

    this.GetUser = function (userId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, userId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.GetUserByEmail = function (emailId) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getUserByEmailIdQuery(emailId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                resolve(res);
            });
        });
    };

    this.Add = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity).then(function (insertId) {
                resolve(insertId);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.Update = function (entity) {
        entity.user_meta.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.user_meta, entity.id).then(function (res) {
                resolve(res);
            });
        });
    };

    this.Delete = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.delete(_this.entityName, entity.id);
            resolve(entity.user_meta);
        });
    };
};

exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map