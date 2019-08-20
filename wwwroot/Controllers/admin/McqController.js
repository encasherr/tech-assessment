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

var _McqModel = require('../../McqModel');

var _McqModel2 = _interopRequireDefault(_McqModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var McqController =
//Model = {};


// initializeCollection = () => {
//     let mcqs = db.getCollection('mcqs');
//     if(!mcqs) {
//         mcqs = db.addCollection('mcqs');
//     }
//     return mcqs;
// }
function McqController() {
    //this.Model = new McqModel();

    _classCallCheck(this, McqController);

    this.GetAll = function (req, resp) {
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
            if (res) {
                resp.status(200).send(res);
            }
        }).catch(function (error) {
            var msg = "Error in fetch MCQ: " + error;
            console.log(msg);
            resp.status(500).send(msg);
        });
    };

    this.Add = function (req, resp) {
        console.log('Add Mcq called');
        console.log(req.body);
        // let mcqs = this.initializeCollection();
        var mcqToAdd = req.body;
        if (req.user) {
            mcqToAdd.addedBy = req.user.emailId;
        }
        var model = new _McqModel2.default();
        model.Add(mcqToAdd).then(function (res) {
            if (res) {
                console.log('MCQ Added');
                resp.status(200).send(JSON.stringify(req.body));
            }
        }).catch(function (error) {
            var msg = "Error in add MCQ: " + error;
            console.log(msg);
            resp.status(500).send(msg);
        });
        // mcqs.insert(mcqToAdd);
        // db.saveDatabase();
        // resp.send(JSON.stringify(req.body));
    };

    this.BulkMcq = function (req, resp) {
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
    };

    this.Update = function (req, resp) {
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
        // let mcqs = this.initializeCollection();
        // let mcqToUpdate = mcqs.find({ '$loki': req.body.$loki });
        // if(mcqToUpdate && mcqToUpdate.length > 0) {
        //     mcqToUpdate[0].title = req.body.title;
        //     mcqToUpdate[0].description = req.body.description;
        //     if(req.user) {
        //         mcqToUpdate[0].updatedBy = req.user.emailId;
        //     }
        //     mcqs.update(mcqToUpdate[0]);
        // }
        // else {
        //     console.log('nothing to update');
        // }
        // console.log(mcqToUpdate);
        // resp.send(JSON.stringify(req.body));
    };

    this.Delete = function (req, resp) {
        console.log('delete mcq called');

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
    };
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

;

exports.default = new McqController();
//# sourceMappingURL=McqController.js.map