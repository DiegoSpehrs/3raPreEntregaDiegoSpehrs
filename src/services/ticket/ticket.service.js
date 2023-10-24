import {ticketMongo} from '../../DAL/DAOs/MongoDAOs/ticketMongo.dao.js';


class TicketService {

    async createTicket(obj){
      const {pucharse, amount} = obj;
      const code = await ticketMongo.codeGenerator();
      const purchase_datetime = new Date() ;
      const ticket = {
        code: code,
        purchase_datetime: purchase_datetime,
        amount: amount,
        pucharse: pucharse
      }
      const newTicket = await ticketMongo.createTicket(ticket)
      return newTicket
    }
}


export const ticketService = new TicketService();
