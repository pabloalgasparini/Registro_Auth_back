import { Router } from "express";
import * as userCtrl from '../controllers/user.controller.js';
import middlewares from "../middlewares/index.js";

const { authJwt, verifySignup } = middlewares; // Importa el middleware authJwt correctamente

const router = Router();

router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userCtrl.createUser);

export default router;
