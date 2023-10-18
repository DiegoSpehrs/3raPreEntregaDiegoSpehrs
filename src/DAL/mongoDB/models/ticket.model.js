import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        unique: true,
    },
    purchase_datatime:{
        type: Date,
    },
    amount:{
        type: Number,
    },
    pucharse:{
        type: String,
    }
})

export const ticketModel = mongoose.model('ticket', ticketSchema);