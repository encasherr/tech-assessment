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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // import db from './db';


var InvitationModel = function InvitationModel() {
    var _this = this;

    _classCallCheck(this, InvitationModel);

    this.entityName = 'invitations';
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

    this.GetInvitationsByUser = function (userEntity) {
        if (_this.entities.data && _this.entities.data.length > 0 && userEntity) {
            var filteredInvitations = _this.entities.data.filter(function (item, index) {
                return item.invitation_meta.addedBy = userEntity.emailId;
            });
            console.log(filteredInvitations.length);
            return filteredInvitations;
        }
        return [];
    };

    this.GetAllInvitations = function (userEntity) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_RoleDefinitions.VIEW_INVITATIONS);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, userEntity);

        /*    return new Promise((resolve, reject) => {
                let sql = queries.getAllInvitationsQuery();
                db.executeQuery(sql).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
            })*/
    };

    this.GetInvitation = function (invitationId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, invitationId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.GetCandidateInfoByInvitationId = function (invitationId) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getCandidateInfoByInvitationId(invitationId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                resolve(res[0]);
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.Add = function (entity) {
        entity.status = "INITIATED";
        entity.invitedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity);
            resolve(true);
        });
    };

    this.Update = function (entity) {
        entity.modifiedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.invitation_meta, entity.id).then(function (res) {
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

exports.default = InvitationModel;
//# sourceMappingURL=InvitationModel.js.map