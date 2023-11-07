import {usersMongo} from '../../DAL/DAOs/MongoDAOs/usersMongo.dao.js';
import { hashData, compareData } from '../../utils.js';

class UsersService{
    async createUser(user){
        const filterAdmin = "adminCoder@coder.com";
        const {first_name,last_name,username,password,email} = user;
        //const userDB = await usersMongo.findOne(username);
        if(!first_name || !last_name || !username || !password || !email) throw new Error('Some required data is missing');
        //if(userDB) throw new Error('user already exists');
        const hashPassword = await hashData(password);
        user.password = hashPassword;
        if(filterAdmin === user.email) {
            user.role = 'admin';

            const newUser = await usersMongo.createOne(user);
            return newUser;
        }else{
            const newUser = await usersMongo.createOne(user);
            return newUser;
        }
    }

    async findUser(email){
       const user = await usersMongo.findOne({email});
       if(!user) throw new Error('User not found')
       return user;
    }

    async findUserLogin(obj){
        const {email, password} = obj;
        if(!email || !password) throw new Error('Some data is missing');
        const userDB = await usersMongo.findOne({email});
        console.log(userDB);
        if(!userDB) throw new Error('singup first')
        const isPasswordValid = await compareData(password, userDB.password);
        if(!isPasswordValid) throw new Error('Email or Password not valid');
        return userDB
    }

    logInAuthentication(roles){
        return (req,res)=>{
            const rol = req.session.role
            console.log(rol)
            if(!roles.includes(rol)) throw new Error("you don't have permissions")
        }
    }
}

export const userService = new UsersService();