import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    pucharse:{
        type:'string',
        require: true
    },
    products:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
       } 
    ]
})

export const cartsModel = mongoose.model('Carts',cartsSchema)