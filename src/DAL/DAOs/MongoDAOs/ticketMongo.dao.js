import { ticketModel } from "../../mongoDB/models/ticket.model.js";
import {basicMongo} from './basicMongo.dao.js';

class TicketMongo extends basicMongo {
    constructor(){
        super(ticketModel);
    }    
}

export const ticketMongo = new TicketMongo();