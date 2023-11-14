import { userService } from '../../services/users/users.service.js';
import { userDTO } from '../../DAL/DTO/userDTO.js';


class UsersController {
    async singupUser(req,res) {
        const user = req.body;
        try {
          const result = await userService.createUser(user);
          res.render('clientHome', {user: user})
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    async getDataUser(req,res) {
        const user = await userService.findUser(req.session.email);
        const safeUser = userDTO(user);
        const dataUser = {
            first_name: safeUser.first_name,
            last_name: safeUser.last_name,
            username: safeUser.username,
            email: safeUser.email,
            age: safeUser.age,
            role: safeUser.role
        }
        res.render('clientHome',{user: dataUser});
    }
    async logInUser(req,res) {
        const {email,password} = req.body;
        console.log({email,password});
        try {
            const user = await userService.findUserLogin({email, password});
            const safeUser = userDTO(user);
            const dataUser = {
                first_name: safeUser.first_name,
                last_name: safeUser.last_name,
                username: safeUser.username,
                email: safeUser.email,
                age: safeUser.age,
                role: safeUser.role
            }
            req.session['email'] = user.email;
            res.render('clientHome',{user: dataUser});
        } catch (error) {
            res.status(400).json({message: error.message});
        }  
    }  
}

export const usersController = new UsersController();