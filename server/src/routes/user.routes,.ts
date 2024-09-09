import { Router } from 'express';
import { login, SignUp, verifyUser } from '../controller/user.controller';
import { authMiddleware } from '../middleware/middleware';

class UserRoutes {
  router = Router();
  constructor() {
    this.routes();
  }
  routes() {
    this.router.post('/signup', SignUp);
    this.router.post('/verifyUser', authMiddleware, verifyUser);
    this.router.post('/', login);
  }
}

export default new UserRoutes().router;
