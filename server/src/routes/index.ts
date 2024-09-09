import { Application } from 'express';
import projectRoutes from './project.routes';
import taskRoute from './task.route';
import userRoutes from './user.routes,';

export default class Routes {
  constructor(app: Application) {
    app.use('/user', userRoutes);
    app.use('/projects', projectRoutes);
    app.use('/tasks', taskRoute)
  }
}
