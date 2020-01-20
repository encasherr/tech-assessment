'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _EmailHelper = require('../../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _ServerConfig = require('../../commons/ServerConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RmaRequestController = function RmaRequestController() {
    var _this = this;

    _classCallCheck(this, RmaRequestController);

    this.GetAll = function (req, resp) {
        console.log('get all rma requests called');
        var rmaRequests = _this.initializeCollection();
        console.log(rmaRequests.data.length);
        resp.send(rmaRequests.data);
    };

    this.Add = function (req, resp) {
        console.log('Add rma request called');
        console.log(req.body);
        var rmaToAdd = req.body;
        var rmaRequests = _this.initializeCollection();
        var rmaCreated = rmaRequests.insert(rmaToAdd);
        _db2.default.saveDatabase();
        //send email
        var emailInfo = {
            to: rmaToAdd.emailTo,
            subject: 'RMA Request Submitted',
            notificationType: 'rma',
            rmaRequest: rmaCreated,
            rmaLink: _this.generate_rma_link(rmaCreated['$loki'])
        };
        var emailHelper = new _EmailHelper2.default();
        emailHelper.SendEmail(emailInfo);

        resp.send(JSON.stringify(req.body));
    };

    this.generate_rma_link = function (rmaRequestId) {
        var link = _ServerConfig.EmailConfig.rmaLinkPrefix + rmaRequestId;
        return link;
    };

    this.Update = function (req, resp) {
        console.log('update rmaRequests called');
        console.log(req.body);
        var rmaRequests = _this.initializeCollection();
        var rmaRequestToUpdate = rmaRequests.find({ '$loki': req.body.$loki });
        if (rmaRequestToUpdate && rmaRequestToUpdate.length > 0) {
            //categoryToUpdate[0].title = req.body.title;
            //categoryToUpdate[0].description = req.body.description;
            //categories.update(categoryToUpdate[0]);
        } else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    };

    this.Delete = function (req, resp) {
        console.log('delete rma request called', req.query.rmaRequestId);
        var rmaRequests = _this.initializeCollection();
        console.log('rmaRequests length', rmaRequests.data.length);
        var rmaRequestToDelete = rmaRequests.chain().find({ '$loki': +req.query.rmaRequestId });
        if (rmaRequestToDelete) {
            rmaRequestToDelete.remove();
            _db2.default.saveDatabase();
            console.log('deleted ' + req.query.rmaRequestId);
            resp.send('deleted ' + req.query.rmaRequestId);
        } else {
            console.log('nothing to delete');
            resp.send('nothing to delete');
        }
    };

    this.initializeCollection = function () {
        var rmaRequests = _db2.default.getCollection('rmaRequests');
        if (!rmaRequests) {
            rmaRequests = _db2.default.addCollection('rmaRequests');
        }
        return rmaRequests;
    };
};

exports.default = new RmaRequestController();
//# sourceMappingURL=RmaRequestController.js.map