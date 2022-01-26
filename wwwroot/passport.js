'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _ServerConfig = require('./commons/ServerConfig');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _UserModel = require('./Models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var GoogleTokenStrategy = require('passport-google-token').Strategy;

var LocalStrategy = require('passport-local').Strategy;

console.log('passport intitialized');
/*
passport.serializeUser(function(user, done) { //In serialize user you decide what to store in the session. Here I'm storing the user id only.
  done(null, user.emailId);
});

passport.deserializeUser(function(emailId, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
    let existingUser = users.GetUser(emailId);
    if(existingUser !== null) {
        console.log('user found');
        let userEntity = {
            ...existingUser,
            emailId: emailId,
            name: existingUser.displayName ? existingUser.displayName : emailId,
            role: existingUser.role
        };
        done(null, userEntity);
    }
    
});
*/
var localOptions = {
    usernameField: 'emailId',
    passwordField: 'password'
};
_passport2.default.use(new LocalStrategy(localOptions, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(emailId, password, done) {
        var userModel, existingUser, userMeta, userEntity, newUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('local strategy being used');
                        userModel = new _UserModel2.default();
                        _context.next = 4;
                        return userModel.CheckUserCredentials(emailId, password);

                    case 4:
                        existingUser = _context.sent;


                        if (existingUser) {
                            console.log('existingUser', existingUser);
                            userMeta = JSON.parse(existingUser.user_meta);
                            userEntity = {
                                id: existingUser.id,
                                emailId: emailId,
                                name: userMeta.name ? userMeta.name : emailId,
                                role: userMeta.role,
                                orgId: userMeta.orgId
                            };

                            done(null, userEntity);
                        } else {
                            newUser = {
                                emailId: emailId,
                                status: 'not found',
                                name: emailId,
                                role: 'guest'
                            };


                            done(null, newUser);
                        }
                        /*
                        userModel.GetUserByEmail(emailId)
                                            .then((users) => {
                                                let existingUser = users[0];
                                                if(existingUser) {
                                                    let userMeta = JSON.parse(existingUser.user_meta);
                                                    let userEntity = {
                                                        id: existingUser.id,
                                                        emailId: emailId,
                                                        name: userMeta.name ? userMeta.name : emailId,
                                                        role: userMeta.role,
                                                        orgId: userMeta.orgId
                                                    };
                                                    console.log('user found', userEntity);
                                                    done(null, userEntity);
                                                }
                                                else {
                                                    console.log('unknown user login being attempted');
                                                    
                                                    const newUser = {
                                                        emailId: emailId,
                                                        status: 'not found',
                                                        name: emailId,
                                                        role: 'guest'
                                                    }
                                                    
                                                    done(null, newUser);
                                                }
                                            });
                        */
                        /*if(emailId === Constants.AdminEmailId) {
                            console.log('admin user being added');
                            let userEntity = {
                                emailId: emailId,
                                name: Constants.AdminEmailId,
                                role: Constants.AdminRole
                            };
                            users.Add(userEntity);
                            return done(null, userEntity);
                        }*/

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}()));
/*
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
        if(emailId === Constants.AdminEmailId) {
            let userEntity = {
                emailId: emailId,
                name: profile.displayName,
                role: Constants.AdminRole
            };
            users.Add(userEntity);
            return done(null, userEntity);
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
*/
//# sourceMappingURL=passport.js.map