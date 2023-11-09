import {cartsModel} from '../../mongoDB/models/carts.model.js';
import BasicMongo from '../MongoDAOs/basicMongo.dao.js';


class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel);
    }
    // crear un create one que reciba un string llamado pucharse asi ya queda supongo funcionando todo el tema este :D

}

export const cartsMongo = new CartsMongo();