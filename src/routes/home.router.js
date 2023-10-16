import { Router } from "express";
import { usersController } from "../controllers/users/users.controller.js";

const router = Router();

router.get('/', usersController.getDataUser);



export default router