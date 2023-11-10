import { usersModel } from '../../mongoDB/models/users.model.js';
import BasicMongo from '../MongoDAOs/basicMongo.dao.js';

class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel);
    }

    async findOne(email) {
        console.log(email);
        const response = await usersModel.findOne(email);
        if(!response) throw new Error('Users not found');
        return response;
    }


    async addCart(obj) {
        console.log('interior obj',obj);
        const {email, cartId} = obj;
        console.log('confirmacion de cartId en la funcion addCart',cartId, email);
        const userMod = await usersModel.findOne({email});
        if(!userMod) throw new Error('User not found');
        userMod.cartId = cartId;
        console.log(userMod);
        const test = await usersModel.findOneAndUpdate({email},{cartId},{new: true});
        console.log(test);
        return ("cart linked successfully", userMod)
    }
}

export const usersMongo = new UsersMongo();