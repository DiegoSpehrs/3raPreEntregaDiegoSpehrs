import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    age:{
        type: Number,
        default: 18
    },
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        default: null
    }
})

export const usersModel = mongoose.model('users', usersSchema);