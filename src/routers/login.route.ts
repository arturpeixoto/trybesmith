import { Router } from 'express';
import loginControler from '../controllers/login.controller';
import checkLoginFieldsMiddleware from '../middlewares/checkLoginFields.middleware';

const loginRouter = Router();

loginRouter.post(
  '/login',
  checkLoginFieldsMiddleware.checkLoginFields,
  loginControler.login,
);

export default loginRouter;