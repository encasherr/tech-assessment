"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _queries = require("../db/queries");

var _queries2 = _interopRequireDefault(_queries);

var _mysqldb = require("../db/mysqldb");

var _mysqldb2 = _interopRequireDefault(_mysqldb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbConfig = function DbConfig() {
    var _this = this;

    _classCallCheck(this, DbConfig);

    this.KeyValues = {};

    this.Initialize = function () {
        return new Promise(function (resolve, reject) {
            var sql = _queries2.default.getAllDbConfig();
            _mysqldb2.default.executeQuery(sql).then(function (res) {
                if (res) {
                    res.map(function (item, index) {
                        _this.KeyValues[item.meta_key] = item.meta_value;
                    });
                    console.log('Db config values set');
                    if (process.env.MYSQL_HOST && process.env.MYSQL_HOST === 'localhost') {
                        _this.KeyValues.site_url = 'http://localhost:3001';
                    }
                    resolve(_this.KeyValues);
                }
            }).catch(function (err) {
                console.log('Error in loading db config values');
                reject(err);
            });
        });
    };
};

exports.default = DbConfig;
//# sourceMappingURL=DbConfig.js.map