import express  from 'express';
import { McqController } from './Controllers/admin';

let api = express.Router();


api.get('/admin/getAllMcqs', McqController.GetAllMcqs);
api.post('/admin/mcq', McqController.AddMcq);
api.put('/admin/mcq', McqController.UpdateMcq);
api.delete('/admin/mcq', McqController.DeleteMcq);

export default api;