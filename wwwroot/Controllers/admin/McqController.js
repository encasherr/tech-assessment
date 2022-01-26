'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _auth = require('../../utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _users = require('../../users');

var _users2 = _interopRequireDefault(_users);

var _McqModel = require('../../Models/McqModel');

var _McqModel2 = _interopRequireDefault(_McqModel);

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var McqController = function (_BaseController) {
    _inherits(McqController, _BaseController);

    function McqController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, McqController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = McqController.__proto__ || Object.getPrototypeOf(McqController)).call.apply(_ref, [this].concat(args))), _this), _this.GetAll = function (req, resp) {
            console.log('get all mcqs called', req.user);
            // let mcqs = this.initializeCollection();
            // if(req.user && req.user.role === users.UserRoles.admin) {
            //     console.log(mcqs.data.length);
            //     return resp.status(200).send(mcqs.data);
            // }
            // else {
            //     this.GetMcqsByRecruiter(req, resp);
            // }
            var model = new _McqModel2.default();
            model.GetAll(req.user).then(function (res) {
                console.log('mcq retrieved');
                resp.status(200).send(res);
            }).catch(function (error) {
                var msg = "Error in fetch MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.GetMcqsBySkill = function (req, resp) {
            console.log('get mcqsBySkill called', req.user);
            var skill = req.query.skill;

            var model = new _McqModel2.default();
            // req.user = {
            //     role: users.UserRoles.admin
            // }
            model.GetMcqsBySkill(req.user, skill).then(function (res) {
                console.log('mcq by skill retrieved');
                resp.status(200).send(res);
            }).catch(function (error) {
                var msg = "Error in fetch MCQs by skill: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.GetMcqsByGrade = function (req, resp) {
            console.log('get mcqsByGrade called', req.user);
            var grade = req.query.grade;

            var model = new _McqModel2.default();
            model.GetMcqsByGrade(req.user, grade).then(function (res) {
                console.log('mcq by grade retrieved');
                resp.status(200).send(res);
            }).catch(function (error) {
                var msg = "Error in fetch MCQs by grade: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.Add = function (req, resp) {
            console.log('Add Mcq called');
            console.log(req.body);
            // let mcqs = this.initializeCollection();
            var mcq_meta = req.body.mcq_meta;

            var model = new _McqModel2.default();
            mcq_meta.createdBy = req.user.id;
            mcq_meta.createdOn = new Date().toLocaleDateString();

            model.Add(mcq_meta).then(function (res) {
                if (res) {
                    console.log('MCQ Added');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in add MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.BulkMcq = function (req, resp) {
            console.log('Bulk Mcq called');
            console.log(req.body);
            var bulkMcqToAdd = req.body;
            if (req.user) {
                bulkMcqToAdd.addedBy = req.user.emailId;
            }
            var model = new _McqModel2.default();
            model.BulkAddMcq(bulkMcqToAdd).then(function (res) {
                if (res) {
                    console.log('Bulk MCQ Added');
                    resp.status(200).send("Success");
                }
            }).catch(function (error) {
                var msg = "Error in Bulk add MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.Update = function (req, resp) {
            console.log('update mcq called');
            console.log(req.body);
            var model = new _McqModel2.default();
            model.Update(req.body).then(function (res) {
                if (res) {
                    console.log('MCQ Updated');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in update MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.Delete = function (req, resp) {
            console.log('delete mcq called');
            console.log(req.body);
            var model = new _McqModel2.default();
            model.Delete(req.body).then(function (res) {
                if (res) {
                    console.log('MCQ Deleted');
                    resp.status(200).send(JSON.stringify(req.body));
                }
            }).catch(function (error) {
                var msg = "Error in delete MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _this.BulkDelete = function (req, resp) {
            console.log('bulk delete mcq called');
            console.log(req.body);
            var model = new _McqModel2.default();
            var mcqIdsToDelete = req.body.mcqIdsToDelete;

            model.DeleteByIds(mcqIdsToDelete).then(function (res) {
                if (res) {
                    console.log('Bulk MCQ Deleted');
                    resp.status(200).send('success');
                }
            }).catch(function (error) {
                var msg = "Error in delete MCQ: " + error;
                console.log(msg);
                resp.status(500).send(msg);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // GetMcqsByRecruiter = (req, resp) => {
    //     console.log('get all mcqs by recruiter called', req.user);
    //     let mcqs = this.initializeCollection();
    //     if(mcqs.data && mcqs.data.length > 0 && req.user) {
    //         let filteredMcqs = mcqs.data.filter((item, index) => {
    //             return item.addedBy = req.user.emailId;
    //         });
    //         console.log(filteredMcqs.length);
    //         return resp.status(200).send(filteredMcqs);
    //     }
    //     resp.status(200).send(mcqs.data);
    // }

    return McqController;
}(_BaseController3.default);

exports.default = new McqController();
//# sourceMappingURL=McqController.js.map