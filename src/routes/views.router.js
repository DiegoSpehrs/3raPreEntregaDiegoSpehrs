import { Router } from "express";
import { viewsController } from "../controllers/views/views.controller.js";


const router = Router();

router.get('/', viewsController.homeRender);

router.get('/realtimeproducts', viewsController.realTimeRender);

router.get('/login', viewsController.loginRender);

router.get('/singup', viewsController.singupRender);

router.get('/adminHome', viewsController.adminHomeRender);

router.get('/clientHome', viewsController.clientHomeRender);

router.get('/cart', viewsController.cartRender); 



export default router