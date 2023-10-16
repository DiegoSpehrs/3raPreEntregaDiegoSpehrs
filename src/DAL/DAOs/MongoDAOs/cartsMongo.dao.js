import {cartsModel} from '../../mongoDB/models/carts.model.js';
import BasicMongo from '../MongoDAOs/basicMongo.dao.js';


class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel);
    }
}

export const cartsMongo = new CartsMongo();