import { ticketModel } from "../../mongoDB/models/ticket.model.js";
import BasicMongo from './basicMongo.dao.js';

class TicketMongo extends BasicMongo {
    constructor(){
        super(ticketModel);
    }

    async createTicket(ticket){
        const newTicket = await ticketModel.create(ticket);
        console.log(newTicket);
        return newTicket;
       
    } 
}


export const ticketMongo = new TicketMongo();