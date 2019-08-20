'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkillController = function SkillController() {
    var _this = this;

    _classCallCheck(this, SkillController);

    this.GetAll = function (req, resp) {
        console.log('get all skills called');
        var skills = _this.initializeCollection();
        console.log(skills.data.length);
        resp.send(skills.data);
    };

    this.Add = function (req, resp) {
        console.log('Add skill called');
        console.log(req.body);
        var skills = _this.initializeCollection();
        skills.insert(req.body);
        _db2.default.saveDatabase();
        resp.send(JSON.stringify(req.body));
    };

    this.Delete = function (req, resp) {
        console.log('delete mcq called');
        resp.send('delete mcq called');
    };

    this.initializeCollection = function () {
        var skills = _db2.default.getCollection('skills');
        if (!skills) {
            skills = _db2.default.addCollection('skills');
        }
        return skills;
    };
};

exports.default = new SkillController();
//# sourceMappingURL=SkillController.js.map