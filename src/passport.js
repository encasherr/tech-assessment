'use strict';

import passport from 'passport';
import { AuthConfig } from './commons/ServerConfig';
var GoogleTokenStrategy = require('passport-google-token').Strategy;
import users from './users';

passport.use('google-token',new GoogleTokenStrategy({
        clientID: AuthConfig.clientId,
        clientSecret: AuthConfig.clientSecret,
        callbackUrl: 'http://localhost:3001/api/admin/auth/callback'
    }, (accessToken, refreshToken, profile, done) => {
    try{
        console.log('profile authenticated', profile);
        let emailId = profile.emails[0].value;
        let existingUser = users.GetUser(emailId);
        if(existingUser !== null) {
            let userEntity = {
                emailId: emailId,
                name: profile.displayName,
                role: existingUser.role
            };
            users.UpdateUser(emailId, userEntity);
            return done(null, existingUser);
        }
        const newUser = {
            emailId: emailId,
            googleId: profile.id,
            status: 'not found',
            name: profile.displayName,
            role: 'guest'
        }
        // users.Add(newUser);
        done(null, newUser);
    }
    catch(err) {
        console.log('error occured in profile authentication callback');
        console.log(err);
        done(err, false, err.message);
    }
}));