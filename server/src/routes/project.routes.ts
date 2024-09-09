import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getAllProject,
  updateProject,
} from '../controller/project.controller';
import { authMiddleware } from '../middleware/middleware';

class ProjectsRoutes {
  router = Router();
  constructor() {
    this.routes();
  }
  routes() {
    this.router.post('/', authMiddleware, createProject);
    this.router.patch('/update/:id', authMiddleware, updateProject);
    this.router.delete('/delete/:id', authMiddleware, deleteProject);
    this.router.get('/', authMiddleware, getAllProject);
  }
}

export default new ProjectsRoutes().router;
