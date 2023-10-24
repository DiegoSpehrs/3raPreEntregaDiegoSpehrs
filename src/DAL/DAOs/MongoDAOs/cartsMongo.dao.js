import {cartsModel} from '../../mongoDB/models/carts.model.js';
import { productsMongo } from './productsMongo.dao.js';
import BasicMongo from '../MongoDAOs/basicMongo.dao.js';


class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel);
    }

    async validateProductStock(product){
        const {quantity, id} = product;
        const productDb = await productsMongo.findById(id);
        if(quantity <= productDb.stock){
          const newStock = quantity - productDb.stock;
          const result = await productsMongo.model.findById(id).updateOne({stock: newStock});
          return result
        }else{
          throw new Error('no hay suficiente stock del producto');
        }
      }
}

export const cartsMongo = new CartsMongo();