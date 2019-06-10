var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import { AuthConfig } from './commons/ServerConfig';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
console.log('client id', AuthConfig.clientId);
passport.use(new GoogleStrategy({
    clientID: AuthConfig.clientId,
    clientSecret: AuthConfig.clientSecret,
    callbackUrl: 'http://localhost:3001/api/admin/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('res 1');
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log('res 2');
            return done(err, user);
       });
  }
));
