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


    async addCart(cartId, email) {
        const user = await usersModel.findOne(email);
        if(!user) throw new Error('User not found');
        user.cartId = cartId;
        console.log(user);
        await usersModel.findOneAndUpdate({email},user);
    }
}

export const usersMongo = new UsersMongo();