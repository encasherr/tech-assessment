'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _users = require('../users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from './db';


var CandidateModel = function CandidateModel() {
    var _this = this;

    _classCallCheck(this, CandidateModel);

    this.entityName = 'candidates';
    this.entities = {};

    this.GetAll = function (userEntity) {
        return new Promise(function (resolve, reject) {
            _this.initializeCollection().then(function (res) {
                if (userEntity && userEntity.role === _users2.default.UserRoles.admin) {
                    console.log(_this.entities.data.length);
                    resolve(_this.entities.data);
                } else {
                    resolve(_this.GetCandidatesByUser(userEntity));
                }
            });
        });
    };

    this.GetCandidatesByUser = function (userEntity) {
        if (_this.entities.data && _this.entities.data.length > 0 && userEntity) {
            var filteredCandidates = _this.entities.data.filter(function (item, index) {
                return item.candidate_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredCandidates.length);
            return filteredCandidates;
        }
        return [];
    };

    this.GetCandidate = function (candidateId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, candidateId).then(function (res) {
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
            _mysqldb2.default.update(_this.entityName, entity.candidate_meta, entity.id).then(function (res) {
                resolve(res);
            });
        });
    };

    this.initializeCollection = function () {
        var promise = new Promise(function (resolve, reject) {
            _mysqldb2.default.getCollection(_this.entityName).then(function (res) {
                _this.entities = res;
                resolve(_this.entities);
            }).catch(function (err) {
                console.log('error occurred: ', err);
                reject(err);
            });
        });
        return promise;
    };
}

// initializeCollection = () => {
//     this.entities = db.getCollection('tests');
//     if(!this.entities) {
//         this.entities = db.addCollection('tests');
//     }
//     console.log('tests entity initialized', this.entities.data.length);
// }
;

exports.default = CandidateModel;
//# sourceMappingURL=CandidateModel.js.map