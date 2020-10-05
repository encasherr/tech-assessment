'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _EmailHelper = require('../../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _ServerConfig = require('../../commons/ServerConfig');

var _AdminTestController = require('./AdminTestController');

var _AdminTestController2 = _interopRequireDefault(_AdminTestController);

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CandidateController = function (_BaseController) {
    _inherits(CandidateController, _BaseController);

    function CandidateController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CandidateController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CandidateController.__proto__ || Object.getPrototypeOf(CandidateController)).call.apply(_ref, [this].concat(args))), _this), _this.GetAll = function (req, resp) {
            console.log('get all candidates called');
            var candidates = _this.initializeCollection();
            console.log(candidates.data.length);
            resp.send(candidates.data);
        }, _this.Add = function (req, resp) {
            console.log('Add Candidate called');
            console.log(req.body);
            var candidates = _this.initializeCollection();
            candidates.insert(req.body);
            _db2.default.saveDatabase(function () {
                _this.EmailSnapshot('CategoryAdd');
            });

            resp.send(JSON.stringify(req.body));
        }, _this.Update = function (req, resp) {
            console.log('update candidate called');
            console.log(req.body);
            var candidates = _this.initializeCollection();
            var candidateToUpdate = candidates.find({ '$loki': req.body.$loki });
            if (candidateToUpdate && candidateToUpdate.length > 0) {
                candidateToUpdate[0].title = req.body.title;
                candidateToUpdate[0].description = req.body.description;
                candidates.update(candidateToUpdate[0]);
            } else {
                console.log('nothing to update');
            }
            console.log(candidateToUpdate);
            resp.send(JSON.stringify(req.body));
        }, _this.Delete = function (req, resp) {
            console.log('get all candidates called');
            resp.send('get all candidates called');
        }, _this.initializeCollection = function () {
            var candidates = _db2.default.getCollection('candidates');
            if (!candidates) {
                candidates = _db2.default.addCollection('candidates');
            }
            return candidates;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // SendInvite = (req, resp) => {
    //     console.log('send invite called');
    //     console.log(req.body);
    //     let { invitations, testId, testName } = req.body;
    //     let test_link = this.generate_test_link(testId);
    //     AdminTestController.UpdateTest(testId, req.body, test_link);
    //     if(invitations && invitations.length > 0) {
    //         let sentEmailIds = [];
    //         invitations.map((inviteInfo, index) => {
    //             if(!sentEmailIds.includes(inviteInfo.emailTo)) {
    //                 let emailInfo = {
    //                     to: inviteInfo.emailTo,
    //                     subject: inviteInfo.emailSubject,
    //                     testName: testName,
    //                     testLink: test_link
    //                 };
    //                 let emailHelper = new EmailHelper();
    //                 emailHelper.SendEmail(emailInfo);
    //                 sentEmailIds.push(inviteInfo.emailTo);
    //             }
    //         })
    //     }
    //     resp.send('Email Sent');
    // }

    // generate_test_link = (testId) => {
    //     let link = EmailConfig.testLinkPrefix + testId;
    //     return link;
    // }

    return CandidateController;
}(_BaseController3.default);

exports.default = new CandidateController();
//# sourceMappingURL=CandidateController.js.map