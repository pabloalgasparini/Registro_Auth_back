import { Router } from "express";
const authRoutes = Router();
import middlewares from '../middlewares/index.js';
import * as authCtrl from '../controllers/auth.controller.js';

authRoutes.post('/signup',
 [middlewares.verifySignup.checkDuplicateUsernameOrEmail, middlewares.verifySignup.checkRolesExisted],
  authCtrl.signUp);

authRoutes.post('/signin', authCtrl.signIn);

export default authRoutes;
