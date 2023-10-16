import { userService } from '../../services/users/users.service.js';


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
        const user = await userService.findUser(req.session.username);
        const dataUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            age: user.age,
            role: user.role
        }
        res.render('clientHome',{user: dataUser});
    }
    async logInUser(req,res) {
        const {username,password} = req.body;
        try {
            const user = await userService.findUserLogin(username, password);
            req,session['username'] = user.username;
            res.status(200).json({message: 'session created', user: user});  
        } catch (error) {
            res.status(400).json({message: error.message});
        }  
    }  
}

export const usersController = new UsersController();