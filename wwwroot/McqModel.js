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

var McqModel = function McqModel() {
    var _this = this;

    _classCallCheck(this, McqModel);

    this.entities = {};

    this.GetAll = function (userEntity) {
        return new Promise(function (resolve, reject) {
            // console.log('get all mcqs called', req.user);
            // let mcqs = this.initializeCollection();
            if (userEntity && userEntity.role === _users2.default.UserRoles.admin) {
                console.log(_this.entities.data.length);
                resolve(_this.entities.data);
            } else {
                _this.GetMcqsByUser(userEntity);
            }
        });
    };

    this.GetMcqsByUser = function (userEntity) {
        if (_this.entities.data && _this.entities.data.length > 0 && userEntity) {
            var filteredMcqs = _this.entities.data.filter(function (item, index) {
                return item.addedBy = userEntity.emailId;
            });
            console.log(filteredMcqs.length);
            return filteredMcqs;
        }
        return [];
    };

    this.BulkAddMcq = function (jsonData) {
        return new Promise(function (resolve, reject) {
            var mcqs = jsonData.mcqs;
            if (mcqs && mcqs.length > 0) {
                mcqs.map(function (item, index) {
                    item.addedBy = jsonData.addedBy;
                    _this.Add(item).then(function (res) {
                        console.log('mcq added');
                    }).catch(function (error) {
                        console.log('mcq add failed: ' + error);
                    });
                });
            }
            resolve(true);
        });
    };

    this.Add = function (entity) {
        return new Promise(function (resolve, reject) {
            console.log('mcq insert called', _this.entities.data.length);
            var correctOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
            if (entity.correctAnswer && correctOptions.indexOf(entity.correctAnswer) > -1) {
                if (entity.choices && entity.choices.length > 0) {
                    entity.choices.map(function (choice, chIndex) {
                        if (chIndex === correctOptions.indexOf(entity.correctAnswer)) {
                            choice.isCorrect = true;
                        } else {
                            choice.isCorrect = false;
                        }
                    });
                }
            }
            _this.entities.insert(entity);
            _db2.default.saveDatabase();
            console.log('save db called');
            resolve(true);
        });
    };

    this.Update = function (entity) {
        return new Promise(function (resolve, reject) {
            // let mcqs = this.initializeCollection();
            var mcqToUpdate = _this.entities.find({ '$loki': entity.$loki });
            if (mcqToUpdate && mcqToUpdate.length > 0) {
                mcqToUpdate[0].title = entity.title;
                mcqToUpdate[0].description = entity.description;
                if (entity.user) {
                    mcqToUpdate[0].updatedBy = entity.emailId;
                }
                _this.entities.update(mcqToUpdate[0]);
                _db2.default.saveDatabase();
                resolve(true);
            } else {
                console.log('nothing to update');
                reject("nothing to update");
            }
        });
    };

    this.Delete = function (entity) {
        return new Promise(function (resolve, reject) {
            var mcqToDelete = _this.entities.chain().find({ '$loki': entity.$loki });
            if (mcqToDelete) {
                mcqToDelete.remove();
                _db2.default.saveDatabase();
                resolve(true);
            } else {
                console.log('nothing to delete');
                reject("nothing to delete");
            }
        });
    };

    this.initializeCollection = function () {
        _this.entities = _db2.default.getCollection('mcqs');
        if (!_this.entities) {
            _this.entities = _db2.default.addCollection('mcqs');
        }
        console.log('mcq entity initialized', _this.entities.data.length);
    };

    this.initializeCollection();
};

exports.default = McqModel;
//# sourceMappingURL=McqModel.js.map