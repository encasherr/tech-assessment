'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseController2 = require('../BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

var _mysqldb = require('../../db/mysqldb');

var _mysqldb2 = _interopRequireDefault(_mysqldb);

var _EmailHelper = require('../../commons/EmailHelper');

var _EmailHelper2 = _interopRequireDefault(_EmailHelper);

var _ServerConfig = require('../../commons/ServerConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import db from '../../db';


var CategoryController = function (_BaseController) {
    _inherits(CategoryController, _BaseController);

    function CategoryController() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CategoryController);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CategoryController.__proto__ || Object.getPrototypeOf(CategoryController)).call.apply(_ref, [this].concat(args))), _this), _this.entityName = 'categories', _this.categories = {}, _this.GetAll = function (req, resp) {
            console.log('get all categories called');
            // let categories = this.initializeCollection();
            _this.initializeCollection().then(function (res) {
                console.log('initialized');
                resp.send(_this.categories.data);
            }).catch(function (err) {
                var obj = { status: 500, message: err };
                resp.status(500).send(obj);
            });
            // console.log(this.categories.data.length);

            //resp.send(categories.data);
        }, _this.Add = function (req, resp) {
            console.log('Add Category called');
            console.log(req.body);
            _mysqldb2.default.insert(_this.entityName, req.body.category_meta);
            resp.send(JSON.stringify(req.body));
            // let categories = this.initializeCollection();
            // this.initializeCollection().then((res) => {
            //     this.categories.insert(req.body);
            //     // this.EmailSnapshot('CategoryAdd');
            //     // db.saveDatabase(() => {
            //     //     this.EmailSnapshot('CategoryAdd');
            //     // });
            //     resp.send(JSON.stringify(req.body));
            // })
        }, _this.Update = function (req, resp) {
            console.log('update category called');
            console.log(req.body);
            // let categories = this.initializeCollection();
            _mysqldb2.default.update(_this.entityName, req.body.category_meta, req.body.id);
            resp.send(JSON.stringify(req.body));
            // this.initializeCollection((res) => {

            //     this.categories.findById(req.body.id).then((res) => {
            //         console.log('findbyid result', res);
            //         if(res && res.length > 0){
            //             let categoryToUpdate = res[0];
            //             console.log('categoryToUpdate', categoryToUpdate);
            //             categoryToUpdate.category_meta = req.body;
            //             // categoryToUpdate.title = req.body.title;
            //             // categoryToUpdate.description = req.body.description;
            //             this.categories.update(categoryToUpdate, categoryToUpdate.id);
            //             console.log(categoryToUpdate);
            //         }
            //         else {
            //             console.log('nothing to update');
            //         }
            //         resp.send(JSON.stringify(req.body)); 
            //     });
            //     // let categoryToUpdate = categories.find({ '$loki': req.body.$loki });
            // if(categoryToUpdate && categoryToUpdate.length > 0) {
            //     categoryToUpdate[0].title = req.body.title;
            //     categoryToUpdate[0].description = req.body.description;
            //     categories.update(categoryToUpdate[0], categoryToUpdate.id);
            //     // categories.update(categoryToUpdate[0]);
            // }
            // else {
            //     console.log('nothing to update');
            // }
            // console.log(categoryToUpdate);
            // resp.send(JSON.stringify(req.body));
            //})
        }, _this.Delete = function (req, resp) {
            console.log('delete category called');
            console.log(req.body);
            _mysqldb2.default.delete(_this.entityName, req.body.id);
            resp.status(200).send('success');
        }, _this.initializeCollection = function () {
            var promise = new Promise(function (resolve, reject) {
                _mysqldb2.default.getCollection(_this.entityName).then(function (res) {
                    // console.log('fetched all categories', res);
                    _this.categories = res;
                    resolve(_this.categories);
                }).catch(function (err) {
                    console.log('error occurred: ', err);
                    reject(err);
                });
            });
            return promise;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /*initializeCollection = () => {
        let categories = db.getCollection('categories');
        if(!categories) {
            categories = db.addCollection('categories');
        }
        return categories;
    }*/

    return CategoryController;
}(_BaseController3.default);

exports.default = new CategoryController();
//# sourceMappingURL=CategoryController.js.map