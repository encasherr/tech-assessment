'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.executeQuery = exports.getData = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const connection = mysql.createConnection({
var mysql_pool = _mysql2.default.createPool({
    connectionLimit: 50,
    host: '95.216.2.208', // cloud2.zolahost.net
    user: 'cashfrom_profile',
    password: 'Encasherr123',
    database: 'cashfrom_profiledb'
});

var getData = function getData(query) {
    // connection.connect((err) => {
    //     console.log('error in open connection', err);
    // });
    // connection.connect();

    var promise = new Promise(function (resolve, reject) {

        console.log('getdata query: ', query);
        mysql_pool.getConnection(function (err, connection) {
            if (err) {
                //connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                reject(err);
            } else {
                connection.query(query, function (error, results, fields) {
                    if (error) {
                        console.log('error in query execution: ', error);
                        reject(error);
                    }
                    console.log('success retrieval');
                    console.log('release connection');
                    connection.release();
                    resolve(results);
                });
            }
        });
    });

    return promise;
};

var executeQuery = function executeQuery(query) {
    var promise = new Promise(function (resolve, reject) {

        console.log('execute query: ', query);
        mysql_pool.getConnection(function (err, connection) {
            if (err) {
                //connection.release();
                console.log(' Error getting mysql_pool connection: ' + err);
                reject(err);
            } else {
                connection.query(query, function (error, results, fields) {
                    if (error) {
                        console.log('error in query execution: ', error);
                        reject(error);
                    }
                    console.log('connection released after query execution');
                    connection.release();
                    resolve(results);
                });
            }
        });
    });

    return promise;
};

exports.getData = getData;
exports.executeQuery = executeQuery;
//# sourceMappingURL=mysql_repo.js.map