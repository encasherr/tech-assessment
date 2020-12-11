'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('./Controllers/admin');

var _candidate = require('./Controllers/candidate');

var _hitech = require('./Controllers/hitech');

var _token = require('./utils/token.utils');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./utils/auth');

var _auth2 = _interopRequireDefault(_auth);

var _OrgController = require('./Controllers/admin/OrgController');

var _OrgController2 = _interopRequireDefault(_OrgController);

var _DashboardController = require('./Controllers/admin/DashboardController');

var _DashboardController2 = _interopRequireDefault(_DashboardController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _express2.default.Router();

api.get('/loadConfig', _admin.UserController.LoadConfig);

/* Admin Routes */
/* mcq endpoints */
// api.get('/admin/getAllMcqs', McqController.GetAll);
api.get('/admin/getAllMcqs', _auth2.default, _admin.McqController.GetAll);
api.post('/admin/mcq', _auth2.default, _admin.McqController.Add);
api.put('/admin/mcq', _auth2.default, _admin.McqController.Update);
api.delete('/admin/mcq', _auth2.default, _admin.McqController.Delete);
api.delete('/admin/bulkmcq', _admin.McqController.BulkDelete);
api.post('/admin/bulkMcq', _auth2.default, _admin.McqController.BulkMcq);

/* category endpoints */
api.get('/admin/getAllCategories', _auth2.default, _admin.CategoryController.GetAll);
api.post('/admin/category', _auth2.default, _admin.CategoryController.Add);
api.put('/admin/category', _auth2.default, _admin.CategoryController.Update);
api.delete('/admin/category', _auth2.default, _admin.CategoryController.Delete);

/* skill endpoints */
api.get('/admin/getAllSkills', _auth2.default, _admin.SkillController.GetAll);
api.post('/admin/skill', _auth2.default, _admin.SkillController.Add);
api.delete('/admin/skill', _auth2.default, _admin.SkillController.Delete);

/* org endpoints */
api.get('/admin/getAllOrgs', _auth2.default, _OrgController2.default.GetAll);
api.post('/admin/org', _auth2.default, _OrgController2.default.Add);
api.put('/admin/org', _auth2.default, _OrgController2.default.Update);
api.delete('/admin/org', _auth2.default, _OrgController2.default.Delete);

/* hitech endpoints */
api.get('/hitech/rmaRequests', _hitech.RmaRequestController.GetAll);
api.post('/hitech/rmaRequest', _hitech.RmaRequestController.Add);
api.get('/hitech/deleteRmaRequest', _hitech.RmaRequestController.Delete);

/* Admin Test endpoints */
api.get('/admin/getAllTests', _auth2.default, _admin.AdminTestController.GetAll);
api.get('/admin/getMcqsByTestId', _auth2.default, _admin.AdminTestController.GetMcqsByTestId);
api.get('/admin/getCandidatesByTestId', _auth2.default, _admin.AdminTestController.GetCandidatesByTestId);
api.get('/admin/getTest', _auth2.default, _admin.AdminTestController.GetTest);
api.post('/admin/test', _auth2.default, _admin.AdminTestController.Add);
api.put('/admin/test', _auth2.default, _admin.AdminTestController.Update);
api.delete('/admin/test', _auth2.default, _admin.AdminTestController.Delete);

/* User endpoints */
api.get('/admin/getAllUsers', _auth2.default, _admin.UserController.GetAll);
api.post('/admin/user', _auth2.default, _admin.UserController.Add);
api.put('/admin/user', _auth2.default, _admin.UserController.Update);
api.delete('/admin/user', _auth2.default, _admin.UserController.Delete);

/* Candidate Routes */
/* Test Invite endpoints */
api.get('/candidate/getAllInvites', _auth2.default, _candidate.TestInviteController.GetAll);
api.get('/candidate/invitation', _candidate.TestInviteController.GetInvitation);
api.post('/candidate/sendInvite', _auth2.default, _candidate.TestInviteController.SendInvite);
api.post('/candidate/startTest', _auth2.default, _candidate.TestInviteController.StartTest);
api.post('/candidate/submitAnswers', _auth2.default, _candidate.TestInviteController.SubmitAnswers);
api.post('/candidate/evaluateAnswers', _auth2.default, _candidate.TestInviteController.EvaluateAnswers);

api.get('/admin/dashboard/test/count', _auth2.default, _DashboardController2.default.GetTestCount);
api.get('/admin/dashboard/mcq/count', _auth2.default, _DashboardController2.default.GetMcqCount);
api.get('/admin/dashboard/invitation/count', _auth2.default, _DashboardController2.default.GetInvitationCount);
// api.get('/admin/dashboard', auth, DashboardController.GetAllStatistics);

api.get('/admin/auth/google', _passport2.default.authenticate('google-token', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }), function (req, res, next) {
    console.log('res next');
    req.auth = req.user;
    if (req.user.status === 'not found') {
        return res.status(403).send('User Not Found');
    }
    next();
}, _token.generateToken, _token.sendToken);

api.post('/admin/auth/local', _passport2.default.authenticate('local', { session: false }), function (req, res, next) {
    console.log('received local call');
    req.auth = req.user;
    if (req.user.status === 'not found') {
        return res.status(401).send('User Not Found');
    }
    next();
}, _token.generateToken, _token.sendToken);

api.post('/candidate/auth/local', _candidate.TestInviteController.AuthenticateCandidate, function (req, res, next) {
    console.log('returned from authenticate candidate', req.user);
    req.auth = req.user;
    if (req.user.status === 'not found') {
        return res.status(401).send('Candidate Not Registered');
    }
    next();
}, _token.generateToken, _token.sendToken);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
api.get('/admin/auth/google/callback', _passport2.default.authenticate('google-token', { failureRedirect: '/login' }), function (req, res) {
    console.log('res 3');
    res.redirect('/');
});

/*
api.route('/admin/auth/callback', (req, resp) => {
    console.log('admin api callback called');
})
api.get('/admin/auth/google',
        passport.authenticate('google-token'), 
        (req, res, next) => {
            console.log('res returned');
            if (!req.user) {
                return res.send(401, 'User Not Authenticated');
            }
            req.auth = {
                id: req.user.id
            };
            next();
        }, 
        generateToken, 
        sendToken);*/
exports.default = api;
//# sourceMappingURL=routes.js.map