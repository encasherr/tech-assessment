'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestModel = function TestModel() {
    var _this = this;

    _classCallCheck(this, TestModel);

    this.entities = {};

    this.GetTestId = function (candidateEmailId) {};

    this.GetTestForSimulator = function (testId) {
        return new Promise(function (resolve, reject) {
            var tests = _this.entities.find({ '$loki': testId });
            console.log('tests filtered for id: ' + testId + ', ' + tests.length);
            if (tests && tests.length > 0) {
                resolve(tests[0]);
            }
            reject("No Test Found");
        });
    };

    this.UpdateTestInvite = function (testEntity, candidateEmailId, testStatus) {
        if (testEntity !== null) {
            var candidateInvite = _this.GetCandidateInvite(testEntity, candidateEmailId);
            if (candidateInvite !== null) {
                candidateInvite.testStatus = testStatus;
                tests.update(testEntity);
                _db2.default.saveDatabase();
                return testEntity;
            }
        }
        return null;
    };

    this.UpdateTestInvite = function (testId, candidateEmailId, testStatus) {
        var tests = _this.entities.find({ '$loki': testId });
        console.log('tests filtered for id: ' + testId + ', ' + tests.length);
        var testEntity = null;
        if (tests && tests.length > 0) {
            testEntity = tests[0];
        }
        if (testEntity !== null) {
            var candidateInvite = _this.GetCandidateInvite(testEntity, candidateEmailId);
            if (candidateInvite !== null) {
                candidateInvite.testStatus = testStatus;
                // tests.update(testEntity);
                _this.entities.update(testEntity);
                _db2.default.saveDatabase();
                return testEntity;
            }
        }
        return null;
    };

    this.GetCandidateInvite = function (testEntity, candidateEmailId) {
        if (testEntity && testEntity.invitations && testEntity.invitations.length > 0) {
            // let filteredCandidates = testEntity.invitations.where((item) => {
            //     return item.emailTo == candidateEmailId;    
            // });
            var filteredCandidates = testEntity.invitations.filter(function (item) {
                return item.emailTo === candidateEmailId;
            });
            console.log('candidates filtered for emailid: ' + candidateEmailId + ', ' + filteredCandidates.length);
            if (filteredCandidates && filteredCandidates.length > 0) {
                return filteredCandidates[0];
            }
        }
        return null;
    };

    this.initializeCollection = function () {
        _this.entities = _db2.default.getCollection('tests');
        if (!_this.entities) {
            _this.entities = _db2.default.addCollection('tests');
        }
        console.log('tests entity initialized', _this.entities.data.length);
    };

    this.initializeCollection();
};

exports.default = TestModel;
//# sourceMappingURL=TestModel.js.map