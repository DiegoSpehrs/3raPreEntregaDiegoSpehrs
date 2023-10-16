import { usersModel } from '../../mongoDB/models/users.model.js';
import BasicMongo from '../MongoDAOs/basicMongo.dao.js';

class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel);
    }

    async findOne(username) {
        const response = await usersModel.findOne({username});
        if(!response) throw new Error('Users not found');
        return response;
    }
}

export const usersMongo = new UsersMongo();