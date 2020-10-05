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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from './db';


var McqResponseModel = function McqResponseModel() {
    var _this = this;

    _classCallCheck(this, McqResponseModel);

    this.entityName = 'mcqresponses';
    this.entities = {};

    this.GetAll = function (userEntity) {
        console.log('user caller', userEntity);
        return new Promise(function (resolve, reject) {
            _this.initializeCollection().then(function (res) {
                if (userEntity && userEntity.role === _users2.default.UserRoles.admin) {
                    console.log(_this.entities.data.length);
                    resolve(_this.entities.data);
                } else {
                    resolve(_this.GetInvitationsByUser(userEntity));
                }
            });
        });
    };

    this.GetMcqResponse = function (responseId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, responseId).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.GetInvitation = function (invitationId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, invitationId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.GetByInvitationId = function (invitationId) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getMcqResponseByInvitationId(invitationId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                var data = _mysqldb2.default.serializeToJson(res, _this.entityName);
                resolve(data[0]);
            }).catch(function (err) {
                reject(err);
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
        entity.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.response_meta, entity.id).then(function (res) {
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

// constructor() {
//   this.initializeCollection();
// }

/*UpdateTestInvite = (testEntity, candidateEmailId, testStatus) => {
    if(testEntity !== null) {
        let candidateInvite = this.GetCandidateInvite(testEntity, candidateEmailId);
        if(candidateInvite !== null) {
            candidateInvite.testStatus = testStatus;
            tests.update(testEntity);
            db.saveDatabase(() => {
                this.EmailSnapshot('CategoryAdd');
            });
    
            return testEntity;
        }
    }
    return null;
}
  GetCandidateInvite = (testEntity, candidateEmailId) => {
    if(testEntity && testEntity.invitations && testEntity.invitations.length > 0) {
        // let filteredCandidates = testEntity.invitations.where((item) => {
        //     return item.emailTo == candidateEmailId;    
        // });
        let filteredCandidates = testEntity.invitations.filter((item) => {
            return item.emailTo === candidateEmailId;
        })
        console.log(`candidates filtered for emailid: ${candidateEmailId}, ${filteredCandidates.length}`);
        if(filteredCandidates && filteredCandidates.length > 0) {
            return filteredCandidates[0];
        }
    }
    return null;
}*/

;

exports.default = McqResponseModel;
//# sourceMappingURL=McqResponseModel.js.map