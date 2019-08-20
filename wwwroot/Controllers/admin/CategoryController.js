'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CategoryController = function CategoryController() {
    var _this = this;

    _classCallCheck(this, CategoryController);

    this.GetAll = function (req, resp) {
        console.log('get all categories called');
        var categories = _this.initializeCollection();
        console.log(categories.data.length);
        resp.send(categories.data);
    };

    this.Add = function (req, resp) {
        console.log('Add Category called');
        console.log(req.body);
        var categories = _this.initializeCollection();
        categories.insert(req.body);
        _db2.default.saveDatabase();
        resp.send(JSON.stringify(req.body));
    };

    this.Update = function (req, resp) {
        console.log('update category called');
        console.log(req.body);
        var categories = _this.initializeCollection();
        var categoryToUpdate = categories.find({ '$loki': req.body.$loki });
        if (categoryToUpdate && categoryToUpdate.length > 0) {
            categoryToUpdate[0].title = req.body.title;
            categoryToUpdate[0].description = req.body.description;
            categories.update(categoryToUpdate[0]);
        } else {
            console.log('nothing to update');
        }
        console.log(categoryToUpdate);
        resp.send(JSON.stringify(req.body));
    };

    this.Delete = function (req, resp) {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
    };

    this.initializeCollection = function () {
        var categories = _db2.default.getCollection('categories');
        if (!categories) {
            categories = _db2.default.addCollection('categories');
        }
        return categories;
    };
};

exports.default = new CategoryController();
//# sourceMappingURL=CategoryController.js.map