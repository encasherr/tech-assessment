'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _queries = require('../db/queries');

var _queries2 = _interopRequireDefault(_queries);

var _RoleDefinitions = require('../commons/RoleDefinitions');

var _TestQueries = require('../commons/RoleBasedQueries/TestQueries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestModel = function TestModel() {
    var _this = this;

    _classCallCheck(this, TestModel);

    this.entityName = 'tests';
    this.entities = {};

    this.GetAll = function (userEntity) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_TestQueries.VIEW_TESTS);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, userEntity);

        /*return new Promise((resolve, reject) => {
            this.initializeCollection().then((res) => {
                if(userEntity && userEntity.role === users.UserRoles.admin) {
                    console.log(this.entities.data.length);
                    resolve(this.entities.data);
                }
                else {
                    resolve(this.GetTestsByUser(userEntity));
                }
            });
        })*/
    };

    this.GetTestById = function (userEntity, testId) {
        var queryConfig = (0, _RoleDefinitions.GetQueryConfig)(_TestQueries.VIEW_TESTS_BY_ID);
        return (0, _RoleDefinitions.HandlePromise)(_mysqldb2.default, queryConfig, { userEntity: userEntity, testId: testId });
    };

    this.GetTest = function (testId) {
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.findOne(_this.entityName, testId).then(function (res) {
                resolve(res);
            });
        });
    };

    this.serializeToJson = function (data) {
        console.log('test data', data);
        var test_meta = data['test_meta'];
        // test_meta = test_meta.replace(/\n/g, "\\n");
        // test_meta = test_meta.replace(/\r/g, "\\r");
        // test_meta = test_meta.replace(/\t/g, "\\t");
        var output = {};
        output.id = data.id;
        output['test_meta'] = JSON.parse(test_meta);
        return output;
        // output['user_meta'] = JSON.parse(data['user_meta']);
        /* let outputArray = [];
         console.log('data count', data.length);
         if(data && data.length > 0) {
             data.map((item, index) => {
                   let test_meta = item['test_meta'];
                 test_meta = test_meta.replace(/\n/g, "\\n");
                 test_meta = test_meta.replace(/\r/g, "\\r");
                 test_meta = test_meta.replace(/\t/g, "\\t");
                 let output = {};
                 output.id = item.id;
                 output['test_meta'] = JSON.parse(test_meta);
                 output['user_meta'] = JSON.parse(item['user_meta']);
                 outputArray.push(output);
             })
         }
         return outputArray;*/
    };

    this.GetCandidatesByTestId = function (testId) {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getCandidatesByTestId(testId);
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                // resolve(res);
                resolve(_this.mapCandidatesResult(res));
            }).catch(function (err) {
                reject(err);
            });
        });
    };

    this.mapCandidatesResult = function (data) {
        var outputArray = [];
        console.log('data count', data.length);
        if (data && data.length > 0) {
            data.map(function (item, index) {
                var output = {};
                Object.keys(item).map(function (prop) {
                    if (prop === 'response_meta') {
                        var metaObj = item[prop];
                        if (metaObj) {
                            metaObj = metaObj.replace(/\n/g, "\\n");
                            metaObj = metaObj.replace(/\r/g, "\\r");
                            metaObj = metaObj.replace(/\t/g, "\\t");
                            var mObj = JSON.parse(metaObj);
                            Object.keys(mObj).forEach(function (metaProp) {
                                output[metaProp] = mObj[metaProp];
                            });
                        }
                    } else {
                        output[prop] = item[prop];
                    }
                });
                outputArray.push(output);
            });
        }
        return outputArray;
    };

    this.Add = function (entity) {
        entity.status = "DRAFT";
        entity.addedOn = new Date().toLocaleDateString();
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.insert(_this.entityName, entity);
            resolve(true);
        });
    };

    this.Update = function (entity) {
        entity.test_meta.updatedOn = new Date().toLocaleDateString();
        if (entity.test_meta.selectedMcqs && entity.test_meta.selectedMcqs.length > 0) {
            entity.test_meta.selectedMcqs.map(function (item, index) {
                item.questionOrderIndex = index;
            });
        }
        return new Promise(function (resolve, reject) {
            _mysqldb2.default.update(_this.entityName, entity.test_meta, entity.id).then(function (res) {
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
/*GetTestsByUser = (userEntity) => {
    if(this.entities.data && this.entities.data.length > 0 && userEntity) {
        let filteredTests = this.entities.data.filter((item, index) => {
            return item.test_meta.addedBy = userEntity.emailId;
        });
        console.log(filteredTests.length);
        return filteredTests;
    }
    return [];
}*/

;

exports.default = TestModel;
//# sourceMappingURL=TestModel.js.map