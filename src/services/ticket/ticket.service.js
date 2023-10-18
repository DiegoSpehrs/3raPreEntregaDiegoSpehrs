import {ticketMongo} from '../../DAL/DAOs/MongoDAOs/ticketMongo.dao.js';
import {productsMongo} from '../../DAL/DAOs/MongoDAOs/productsMongo.dao.js';

class TicketService {

    async validateProductStock(product){
      const {quantity, id} = product;
      const productDb = await productsMongo.findById(id);
      if(quantity <= productDb.stock){
        const newStock = quantity - productDb.stock;
        const result = await productsMongo.model.findById(id).updateOne({stock: newStock});
        return result
      }
    }
}


export const ticketService = new TicketService();
