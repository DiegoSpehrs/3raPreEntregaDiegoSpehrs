import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime:{
        type: Date,
        unique: true,
    },
    amount:{
        type: Number,
    },
    pucharse:{
        type: String,
    }
})

export const ticketModel = mongoose.model('ticket', ticketSchema);