import express  from 'express';
import { McqController, CategoryController, SkillController,
        CandidateController, AdminTestController, InviteController,
        UserController } from './Controllers/admin';
import { TestInviteController } from './Controllers/candidate';

import { generateToken, sendToken } from './utils/token.utils';
import passport from 'passport';
import auth from './utils/auth';


let api = express.Router();

/* Admin Routes */
/* mcq endpoints */
api.get('/admin/getAllMcqs', auth, McqController.GetAll);
api.post('/admin/mcq', auth, McqController.Add);
api.put('/admin/mcq', auth, McqController.Update);
api.delete('/admin/mcq', auth, McqController.Delete);

/* category endpoints */
api.get('/admin/getAllCategories', auth, CategoryController.GetAll);
api.post('/admin/category', auth, CategoryController.Add);
api.put('/admin/category', auth, CategoryController.Update);
api.delete('/admin/category', auth, CategoryController.Delete);

/* skill endpoints */
api.get('/admin/getAllSkills', auth, SkillController.GetAll);
api.post('/admin/skill', auth, SkillController.Add);
api.delete('/admin/skill', auth, SkillController.Delete);

/* candidate endpoints */
// api.get('/admin/getAllCandidates', auth, CandidateController.GetAll);
// api.post('/admin/candidate', auth, CandidateController.Add);
// api.put('/admin/candidate', auth, CandidateController.Update);
api.post('/admin/sendInvite', auth, CandidateController.SendInvite);
// api.delete('/admin/candidate', auth, CandidateController.Delete);

/* Admin Test endpoints */
api.get('/admin/getAllTests', auth,  AdminTestController.GetAll);
api.get('/admin/getTest', auth, AdminTestController.GetTest);
api.post('/admin/test', auth, AdminTestController.Add);
api.put('/admin/test', auth, AdminTestController.Update);
api.delete('/admin/test', auth, AdminTestController.Delete);

/* User endpoints */
api.get('/admin/getAllUsers', auth,  UserController.GetAll);
api.post('/admin/user', auth, UserController.Add);
api.put('/admin/user', auth, UserController.Update);


/* Candidate Routes */
/* Test Invite endpoints */
api.post('/candidate/startTest', auth, TestInviteController.StartTest);

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
