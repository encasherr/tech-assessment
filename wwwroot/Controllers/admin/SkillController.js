'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysqldb = require('../../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import db from '../../db';


var SkillController = function (_BaseController) {
    _inherits(SkillController, _BaseController);

    function SkillController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SkillController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SkillController.__proto__ || Object.getPrototypeOf(SkillController)).call.apply(_ref, [this].concat(args))), _this), _this.entityName = 'skills', _this.skills = {}, _this.GetAll = function (req, resp) {
            console.log('get all skills called');
            // let skills = this.initializeCollection();
            // console.log(skills.data.length);
            // resp.send(skills.data);
            _this.initializeCollection().then(function (res) {
                console.log('initialized');
                resp.send(_this.skills.data);
            }).catch(function (err) {
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });
        }, _this.Add = function (req, resp) {
            console.log('Add skill called');
            console.log(req.body);
            _mysqldb2.default.insert(_this.entityName, req.body.skill_meta);

            // let skills = this.initializeCollection();
            // skills.insert(req.body);
            // db.saveDatabase(() => {
            //     this.EmailSnapshot('CategoryAdd');
            // });

            resp.send(JSON.stringify(req.body));
        }, _this.Delete = function (req, resp) {
            console.log('delete skill called');
            console.log(req.body);
            _mysqldb2.default.delete(_this.entityName, req.body.id);
            resp.status(200).send('success');
        }, _this.initializeCollection = function () {
            var promise = new Promise(function (resolve, reject) {
                _mysqldb2.default.getCollection(_this.entityName).then(function (res) {
                    _this.skills = res;
                    resolve(_this.skills);
                }).catch(function (err) {
                    console.log('error occurred: ', err);
                    reject(err);
                });
            });
            return promise;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    // initializeCollection = () => {
    //     let skills = db.getCollection('skills');
    //     if(!skills) {
    //         skills = db.addCollection('skills');
    //     }
    //     return skills;
    // }


    return SkillController;
}(_BaseController3.default);

exports.default = new SkillController();
//# sourceMappingURL=SkillController.js.map