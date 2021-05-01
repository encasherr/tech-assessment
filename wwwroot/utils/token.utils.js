'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendToken = exports.generateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ServerConfig = require('../commons/ServerConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var jwt = require('jsonwebtoken');

var createToken = function createToken(auth) {
    console.log('creating token');
    return _jsonwebtoken2.default.sign({
        googleId: auth.googleId ? auth.googleId : auth.emailId,
        id: auth.id,
        emailId: auth.emailId,
        role: auth.role,
        name: auth.name,
        orgId: auth.orgId
    }, _ServerConfig.AuthConfig.myPrivateKey,
    // }, 'my-secret',
    {
        expiresIn: 60 * 120
        // expiresIn: 15
    });
};

var generateToken = function generateToken(req, res, next) {
    console.log('generating token', req.user);
    req.token = createToken(req.auth);
    return next();
};

var sendToken = function sendToken(req, res) {
    console.log('sending token');
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

exports.generateToken = generateToken;
exports.sendToken = sendToken;
//# sourceMappingURL=token.utils.js.map