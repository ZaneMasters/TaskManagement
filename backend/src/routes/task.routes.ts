import { Router } from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { basicAuth } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(basicAuth);

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
