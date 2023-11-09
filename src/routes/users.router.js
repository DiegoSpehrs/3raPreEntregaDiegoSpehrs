import { Router } from "express";
import { usersController } from "../controllers/users/users.controller.js";
import passport from "passport";

const router = Router();

router.post('/singup', usersController.singupUser);

router.get('/githubSignup',passport.authenticate('github',{scope: ['user:email']}));

router.get('/github',passport.authenticate('github',{failureRedirect:'/api/views/singup'}),(req,res)=>{
    req.session['email'] = req.user.email
    res.redirect('/api/home')
});


export default router