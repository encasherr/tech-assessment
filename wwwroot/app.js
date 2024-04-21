"use strict";

require("babel-core/register");

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _passport = require("./passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("passport");

var _passport4 = _interopRequireDefault(_passport3);

var _general = require("./utils/general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CronScheduler from './commons/CronSheduler';
console.log("process.env.PORT: " + process.env.PORT);
var port_number = process.env.PORT || 3001 || 8005;
var app = (0, _express2.default)();

app.server = _http2.default.createServer(app);
app.use(_bodyParser2.default.json());
app.use(_express2.default.static(_path2.default.join(__dirname)));
app.use(_express2.default.static(_path2.default.resolve(__dirname + '/landing/')));

app.use(_passport4.default.initialize());
// app.use(CronScheduler);

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use((0, _cors2.default)(corsOption));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

(0, _general.createPrerequisitesDir)();

app.use('/api', _routes2.default);

global.appRoot = _path2.default.resolve(__dirname);
console.log('global.appRoot', global.appRoot);

app.use('/home', function (req, resp) {
    // let fileName = path.resolve(__dirname + '/index.html');
    var fileName = _path2.default.resolve(__dirname + '/landing/index.html');
    console.log('request in /', fileName);
    resp.sendFile(fileName);
});

// app.use('/tests', (req, resp) => {
//     let fileName = path.resolve(__dirname + '/index.html');
//     console.log('request in /', fileName);
//     resp.sendFile(fileName);
// });

app.use('/*', function (req, resp) {
    var fileName = _path2.default.resolve(__dirname + '/index.html');
    console.log('request in /*', fileName);
    resp.sendFile(fileName);
});

app.use('/testLanding', function (req, resp) {
    var fileName = _path2.default.resolve(__dirname + '/index.html');
    resp.sendFile(fileName);
});
/* This is for preventing routes and sending forbidden message for unknown urls */
// app.get('/home', function (req, res) {
//     let fileName = path.resolve(__dirname + '/index.html');
//     console.log(fileName);
//     res.sendFile(fileName);
// });
/* This is for allowing refresh when using client side routing and redirecting accordingly */
/*
app.get('/*', function (req, res) {
    let fileName = path.resolve(__dirname + '/index.html');
    console.log(fileName);
    res.sendFile(fileName);
});
*/
app.listen(port_number, function () {
    console.log('Tech Assess API runnning on ' + port_number);
});
//# sourceMappingURL=app.js.map