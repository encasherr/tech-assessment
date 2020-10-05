'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _OrgModel = require('../../Models/OrgModel');

var _OrgModel2 = _interopRequireDefault(_OrgModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrgController = function (_BaseController) {
    _inherits(OrgController, _BaseController);

    function OrgController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, OrgController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrgController.__proto__ || Object.getPrototypeOf(OrgController)).call.apply(_ref, [this].concat(args))), _this), _this.GetAll = function (req, resp) {
            console.log('get all orgs called');
            var model = new _OrgModel2.default();

            model.GetAll(req.user).then(function (res) {
                console.log('fetched orgs');
                resp.status(200).json(res);
            }).catch(function (err) {
                console.log('Exception in fetching orgs: ' + err);
                var obj = { status: 500, message: err };
                resp.status(500).json(obj);
            });
        }, _this.Add = function (req, resp) {
            console.log('Add org called');
            console.log(req.body);
            var org_meta = req.body.org_meta;

            var model = new _OrgModel2.default();
            model.Add(org_meta).then(function (orgId) {
                resp.status(200).send('success');
            }).catch(function (err) {
                resp.status(500).json({ message: err });
            });
        }, _this.Update = function (req, resp) {
            console.log('Update Org called');
            console.log(req.body);
            var entity = req.body;
            var model = new _OrgModel2.default();
            model.Update(entity).then(function (orgId) {
                resp.status(200).send('success');
            }).catch(function (err) {
                resp.status(500).json({ message: err });
            });
        }, _this.Delete = function (req, resp) {
            console.log('delete org called');
            console.log(req.body);
            var entity = req.body;
            var model = new _OrgModel2.default();
            model.Delete(entity).then(function (orgId) {
                resp.status(200).send('success');
            }).catch(function (err) {
                resp.status(500).json({ message: err });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return OrgController;
}(_BaseController3.default);

exports.default = new OrgController();
//# sourceMappingURL=OrgController.js.map