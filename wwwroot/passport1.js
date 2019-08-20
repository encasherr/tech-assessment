'use strict';

var _ServerConfig = require('./commons/ServerConfig');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
console.log('client id', _ServerConfig.AuthConfig.clientId);
passport.use(new GoogleStrategy({
     clientID: _ServerConfig.AuthConfig.clientId,
     clientSecret: _ServerConfig.AuthConfig.clientSecret,
     callbackUrl: 'http://localhost:3001/api/admin/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
     console.log('res 1');
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
          console.log('res 2');
          return done(err, user);
     });
}));
//# sourceMappingURL=passport1.js.map