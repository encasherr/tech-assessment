'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminTestController = function AdminTestController() {
    var _this = this;

    _classCallCheck(this, AdminTestController);

    this.GetAll = function (req, resp) {
        console.log('get all tests called', req.user);
        var tests = _this.initializeCollection();
        console.log(tests.data.length);
        resp.status(200).json(tests.data);
    };

    this.GetTest = function (req, resp) {
        var testId = req.query.testId;
        console.log('get test called: ' + testId);
        var tests = _this.initializeCollection();
        // let test = tests.findOne({ '$loki': testId });
        var filteredTests = tests.where(function (item) {
            console.log('item: ' + item['$loki'] + ', testId: ' + testId + ', result: ' + (item['$loki'] == testId));
            return item['$loki'] == testId;
        });

        console.log(filteredTests[0]);
        resp.send(filteredTests[0]);
    };

    this.Add = function (req, resp) {
        console.log('Add Test called');
        var tests = _this.initializeCollection();
        var test = tests.insert(req.body);
        _db2.default.saveDatabase();
        console.log(test);
        resp.send(test);
    };

    this.Update = function (req, resp) {
        console.log('update test called');
        console.log(req.body);
        var testId = req.body.$loki;
        var entity = _this.UpdateTest(testId, req.body);
        resp.send(entity);

        // let filteredTests = tests.where((item) => {
        //     console.log(`item: ${item['$loki']}, testId: ${testId}, result: ${item['$loki'] == testId}`); 
        //     return item['$loki'] == testId;    
        // });
        // console.log(testId);
        // if(filteredTests && filteredTests.length > 0) {
        //     let testToUpdate = filteredTests[0];
        //     let entityToUpdate = this.replaceEntity(testToUpdate, req.body);
        //     tests.update(entityToUpdate);
        //     db.saveDatabase();
        //     resp.send(entityToUpdate);
        // }
        // else {
        //     console.log('nothing to update');
        //     resp.send('nothing to update');
        // }
    };

    this.UpdateTest = function (testId, newEntity, test_link) {
        var tests = _this.initializeCollection();
        var filteredTests = tests.where(function (item) {
            console.log('item: ' + item['$loki'] + ', testId: ' + testId + ', result: ' + (item['$loki'] == testId));
            return item['$loki'] == testId;
        });
        console.log(testId);
        if (filteredTests && filteredTests.length > 0) {
            var testToUpdate = filteredTests[0];
            if (newEntity && newEntity.invitations && newEntity.invitations.length > 0) {
                var invitations = [];
                newEntity.invitations.map(function (invitation, index) {
                    var filteredInvitations = invitations.filter(function (item, id) {
                        return item.emailTo === invitation.emailTo;
                    });
                    if (filteredInvitations && filteredInvitations.length > 0) {} else {
                        invitation.test_link = test_link;
                        invitations.push(invitation);
                    }
                });
                newEntity.invitations = [];
                newEntity.invitations = invitations;
            }
            var entityToUpdate = _this.replaceEntity(testToUpdate, newEntity);
            tests.update(entityToUpdate);
            _db2.default.saveDatabase();
            return entityToUpdate;
        } else {
            console.log('nothing to update');
            return null;
        }
    };

    this.Delete = function (req, resp) {
        console.log('delete test called');
        resp.send('delete test called');
    };

    this.initializeCollection = function () {
        var tests = _db2.default.getCollection('tests');
        if (!tests) {
            tests = _db2.default.addCollection('tests');
        }
        return tests;
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
};

exports.default = new AdminTestController();
//# sourceMappingURL=AdminTestController.js.map