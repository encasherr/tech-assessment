import express  from 'express';
import { McqController } from './Controllers/admin';

let api = express.Router();


/* mcq endpoints */
api.get('/admin/getAllMcqs', McqController.GetAllMcqs);
api.post('/admin/mcq', McqController.AddMcq);
api.put('/admin/mcq', McqController.UpdateMcq);
api.delete('/admin/mcq', McqController.DeleteMcq);

/* category endpoints */
api.get('/admin/getAllCategories', McqController.GetAllCategpries);
api.post('/admin/category', McqController.AddCategory);
api.put('/admin/category', McqController.UpdateCategory);
api.delete('/admin/category', McqController.DeleteCategory);

export default api;