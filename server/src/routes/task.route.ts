import { Router } from 'express';
import { createTask, deleteTask, getAllTasks, getAllTasksByUserId, updateTask } from '../controller/tasks.controller';
import { authMiddleware } from '../middleware/middleware';

class TasksRoutes {
  router = Router();
  constructor() {
    this.routes();
  }
  routes() {
    this.router.get('/', authMiddleware, getAllTasksByUserId)
    this.router.post('/:id', authMiddleware, createTask);
    this.router.patch('/:id', authMiddleware, updateTask);
    this.router.delete('/:id', authMiddleware, deleteTask);
    this.router.get('/:id', authMiddleware, getAllTasks);
  }
}

export default new TasksRoutes().router;
