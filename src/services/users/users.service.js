import {usersMongo} from '../../DAL/DAOs/MongoDAOs/usersMongo.dao.js';
import { hashData, compareData } from '../../utils.js';

class UsersService{
    async createUser(user){
        const filterAdmin = "adminCoder@coder.com";
        const {first_name,last_name,username,password,email} = user;
        //const userDB = await usersMongo.findOne(username);
        if(!first_name || !last_name || !username || !password || !email) throw new Error('Some required data is missing');
        //if(userDB) throw new Error('user already exists');
        const hasPassword = await hashData(password);
        if(filterAdmin === user.email) {
            user.role = 'admin';
            const newUser = await usersMongo.createOne(user, {password:hasPassword});
            return newUser;
        }else{
            const newUser = await usersMongo.createOne(user,{password:hasPassword});
            return newUser;
        }
    }

    async findUser(username){
       const user = await usersMongo.findOne({username});
       if(!user) throw new Error('User not found')
       return user;
    }

    async findUserLogin(username, password){
        console.log(username, password);
        if(!username || !password) throw new Error('Some data is missing');
        const userDB = await usersMongo.findOne({username});
        if(!userDB) throw new Error('singup first')
        const isPasswordValid = await compareData(password, userDB.password);
        if(!isPasswordValid) throw new Error('Username or Password not valid');
        return userDB
    }
}

export const userService = new UsersService();