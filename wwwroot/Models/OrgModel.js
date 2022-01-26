'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _users = require('../users');

var _users2 = _interopRequireDefault(_users);

var _RoleDefinitions = require('../commons/RoleDefinitions');

var _OrgQueries = require('../commons/RoleBasedQueries/OrgQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrgModel = function OrgModel() {
    var _this = this;

    _classCallCheck(this, OrgModel);

    this.entityName = 'org';
    this.entities = {};

    this.GetAll = function (userEntity) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_OrgQueries.VIEW_ORGS);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, userEntity);
    };

    this.GetOrg = function (orgId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, orgId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.Add = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity).then(function (insertId) {
                resolve(insertId);
            });
        });
    };

    this.Update = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.org_meta, entity.id).then(function (res) {
                resolve(res);
            });
        });
    };

    this.Delete = function (entity) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.delete(_this.entityName, entity.id).then(function (res) {
                resolve(res);
            });
        });
    };
};

exports.default = OrgModel;
//# sourceMappingURL=OrgModel.js.map