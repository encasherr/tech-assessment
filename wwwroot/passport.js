'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _ServerConfig = require('./commons/ServerConfig');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleTokenStrategy = require('passport-google-token').Strategy;


_passport2.default.use('google-token', new GoogleTokenStrategy({
    clientID: _ServerConfig.AuthConfig.clientId,
    clientSecret: _ServerConfig.AuthConfig.clientSecret,
    callbackUrl: 'http://localhost:3001/api/admin/auth/callback'
}, function (accessToken, refreshToken, profile, done) {
    try {
        console.log('profile authenticated', profile);
        var emailId = profile.emails[0].value;
        var existingUser = _users2.default.GetUser(emailId);
        if (existingUser !== null) {
            var userEntity = {
                emailId: emailId,
                name: profile.displayName,
                role: existingUser.role
            };
            _users2.default.UpdateUser(emailId, userEntity);
            return done(null, existingUser);
        }
        if (emailId === _ServerConfig.Constants.AdminEmailId) {
            var _userEntity = {
                emailId: emailId,
                name: profile.displayName,
                role: _ServerConfig.Constants.AdminRole
            };
            _users2.default.Add(_userEntity);
            return done(null, _userEntity);
        }
        var newUser = {
            emailId: emailId,
            googleId: profile.id,
            status: 'not found',
            name: profile.displayName,
            role: 'guest'
            // users.Add(newUser);
        };done(null, newUser);
    } catch (err) {
        console.log('error occured in profile authentication callback');
        console.log(err);
        done(err, false, err.message);
    }
}));
//# sourceMappingURL=passport.js.map