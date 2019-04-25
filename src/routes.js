import express  from 'express';
import { McqController, CategoryController, SkillController,
         CandidateController } from './Controllers/admin';

let api = express.Router();


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
api.delete('/admin/candidate', CandidateController.Delete);

export default api;