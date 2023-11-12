import {ticketMongo} from '../../DAL/DAOs/MongoDAOs/ticketMongo.dao.js';
import Randomstring from 'randomstring';


class TicketService {

    async createTicket(req,res){
      const totalAmount = req.session.totalAmount;
      const pucharse = req.session.email;
      const code = Randomstring.generate();
      const purchase_datetime = new Date() ;
      const ticket = {
        code: code,
        purchase_datetime: purchase_datetime,
        totalAmount: totalAmount,
        pucharse: pucharse
      }
      const newTicket = await ticketMongo.createTicket(ticket)
      return newTicket
    }
}


export const ticketService = new TicketService();
