import { ticketModel } from "../../mongoDB/models/ticket.model.js";
import {basicMongo} from './basicMongo.dao.js';

class TicketMongo extends basicMongo {
    constructor(){
        super(ticketModel);
    }

    async createTicket(ticket){
        const newTicket = await ticketModel.create(ticket);
        console.log(newTicket);
        return newTicket;
       
    }
    
    async codeGenerator(){
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
       var code = "";
       for (i=0; i<20; i++) code += caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
       return code;
    }

    
}


export const ticketMongo = new TicketMongo();