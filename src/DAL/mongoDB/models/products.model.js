import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title:{
        type: 'string',
        require: true,
        index: true
    },
    description:{
        type: 'string',
        require: true
    },
    price:{
        type: 'number',
        require: true
    },
    thumbnail:{
        type: 'string',
        require: true
    },
    category:{
        type: 'string',
        require: true,
        index: true
    },
    code:{
        type: 'string',
        require: true,
        index: true
    },
    stock:{
        type: 'number',
        require: true
    },
    quantity:{
        type: 'number',
        require: true
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('products',productsSchema)