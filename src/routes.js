import express  from 'express';
import { McqController, CategoryController, SkillController,
        CandidateController, AdminTestController, InviteController,
        UserController } from './Controllers/admin';
import { TestInviteController } from './Controllers/candidate';

import { RmaRequestController } from './Controllers/hitech';

import { generateToken, sendToken } from './utils/token.utils';
import passport from 'passport';
import auth from './utils/auth';
import OrgController from './Controllers/admin/OrgController';
import DashboardController from './Controllers/admin/DashboardController';
import CandidateResponseController from './Controllers/admin/CandidateResponseController';


let api = express.Router();


api.get('/loadConfig', UserController.LoadConfig);

/* Admin Routes */
/* mcq endpoints */
// api.get('/admin/getAllMcqs', McqController.GetAll);
api.get('/admin/getAllMcqs', auth, McqController.GetAll);
api.get('/admin/getMcqsBySkill', auth, McqController.GetMcqsBySkill);
api.post('/admin/mcq', auth, McqController.Add);
api.put('/admin/mcq', auth, McqController.Update);
api.delete('/admin/mcq', auth, McqController.Delete);
api.delete('/admin/bulkmcq', McqController.BulkDelete);
api.post('/admin/bulkMcq', auth, McqController.BulkMcq);

/* category endpoints */
api.get('/admin/getAllCategories', auth, CategoryController.GetAll);
api.post('/admin/category', auth, CategoryController.Add);
api.put('/admin/category', auth, CategoryController.Update);
api.delete('/admin/category', auth, CategoryController.Delete);

/* skill endpoints */
api.get('/admin/getAllSkills', auth, SkillController.GetAll);
api.post('/admin/skill', auth, SkillController.Add);
api.delete('/admin/skill', auth, SkillController.Delete);

/* org endpoints */
api.get('/admin/getAllOrgs', auth, OrgController.GetAll);
api.post('/admin/org', auth, OrgController.Add);
api.put('/admin/org', auth, OrgController.Update);
api.delete('/admin/org', auth, OrgController.Delete);

/* hitech endpoints */
api.get('/hitech/rmaRequests', RmaRequestController.GetAll);
api.post('/hitech/rmaRequest', RmaRequestController.Add);
api.get('/hitech/deleteRmaRequest', RmaRequestController.Delete);

/* Admin Test endpoints */
api.get('/admin/getAllTests', auth, AdminTestController.GetAll);
api.get('/admin/getMcqsByTestId', auth, AdminTestController.GetMcqsByTestId);
api.get('/admin/getCandidatesByTestId', auth, AdminTestController.GetCandidatesByTestId);
api.get('/admin/getTest', auth, AdminTestController.GetTest);
api.post('/admin/test', auth, AdminTestController.Add);
api.put('/admin/test', auth, AdminTestController.Update);
api.delete('/admin/test', auth, AdminTestController.Delete);

/* User endpoints */
api.get('/admin/getAllUsers', auth,  UserController.GetAll);
api.post('/admin/user', auth, UserController.Add);
api.put('/admin/user', auth, UserController.Update);
api.delete('/admin/user', auth, UserController.Delete);

/* Candidate Response Endpoints */
api.get('/admin/getCandidateResponseReport', auth, CandidateResponseController.GetCandidateResponse);
api.get('/admin/getCandidateDetails', auth, CandidateResponseController.GetCandidateDetails);

/* Candidate Routes */
/* Test Invite endpoints */
api.get('/candidate/getAllInvites', auth, TestInviteController.GetAll);
api.get('/candidate/invitation', TestInviteController.GetInvitation);
api.post('/candidate/sendInvite', auth, TestInviteController.SendInvite);
api.post('/candidate/startTest', auth, TestInviteController.StartTest);
api.post('/candidate/submitAnswers', auth, TestInviteController.SubmitAnswers);
api.post('/candidate/evaluateAnswers', auth, TestInviteController.EvaluateAnswers);

api.get('/admin/dashboard/test/count', auth, DashboardController.GetTestCount);
api.get('/admin/dashboard/mcq/count', auth, DashboardController.GetMcqCount);
api.get('/admin/dashboard/invitation/count', auth, DashboardController.GetInvitationCount);
// api.get('/admin/dashboard', auth, DashboardController.GetAllStatistics);

api.get('/admin/auth/google',
    passport.authenticate('google-token', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }),
    (req, res, next) => {
        console.log('res next');
        req.auth = req.user;
        if(req.user.status === 'not found') {
            return res.status(403).send('User Not Found');
        }
        next();
    }, generateToken, sendToken);

    
api.post('/admin/auth/local',passport.authenticate('local',{session: false}),
   (req, res, next) => {
    console.log('received local call');
    req.auth = req.user;
        if(req.user.status === 'not found') {
            return res.status(401).send('User Not Found');
        }
        next();
}, generateToken, sendToken);


api.post('/candidate/auth/local',TestInviteController.AuthenticateCandidate,
   (req, res, next) => {
       console.log('returned from authenticate candidate', req.user);
        req.auth = req.user;
        if(req.user.status === 'not found') {
            return res.status(401).send('Candidate Not Registered');
        }
        next();
}, generateToken, sendToken);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
api.get('/admin/auth/google/callback', 
  passport.authenticate('google-token', { failureRedirect: '/login' }),
  function(req, res) {
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
export default api;
