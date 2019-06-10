import express  from 'express';
import { McqController, CategoryController, SkillController,
         CandidateController, AdminTestController, InviteController } from './Controllers/admin';
import { TestInviteController } from './Controllers/candidate';

import { generateToken, sendToken } from './utils/token.utils';
import passport from 'passport';
import auth from './utils/auth';


let api = express.Router();

/* Admin Routes */
/* mcq endpoints */
api.get('/admin/getAllMcqs', McqController.GetAll);
api.post('/admin/mcq', McqController.Add);
api.put('/admin/mcq', McqController.Update);
api.delete('/admin/mcq', McqController.Delete);

/* category endpoints */
api.get('/admin/getAllCategories', CategoryController.GetAll);
api.post('/admin/category', CategoryController.Add);
api.put('/admin/category', CategoryController.Update);
api.delete('/admin/category', CategoryController.Delete);

/* skill endpoints */
api.get('/admin/getAllSkills', SkillController.GetAll);
api.post('/admin/skill', SkillController.Add);
api.delete('/admin/category', SkillController.Delete);

/* candidate endpoints */
api.get('/admin/getAllCandidates', CandidateController.GetAll);
api.post('/admin/candidate', CandidateController.Add);
api.put('/admin/candidate', CandidateController.Update);
api.post('/admin/sendInvite', CandidateController.SendInvite);
api.delete('/admin/candidate', CandidateController.Delete);

/* Admin Test endpoints */
api.get('/admin/getAllTests', auth, AdminTestController.GetAll);
api.get('/admin/getTest', AdminTestController.GetTest);
api.post('/admin/test', AdminTestController.Add);
api.put('/admin/test', AdminTestController.Update);
api.delete('/admin/test', AdminTestController.Delete);

/* Candidate Routes */
/* Test Invite endpoints */
api.post('/candidate/startTest', TestInviteController.StartTest);

api.get('/admin/auth/google',
  passport.authenticate('google-token', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }),
    (req, res, next) => {
        console.log('res next');
        req.auth = req.user;
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