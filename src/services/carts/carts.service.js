import {cartsMongo} from '../../DAL/DAOs/MongoDAOs/cartsMongo.dao.js';

class CartsService {
    async getAllCarts(){
        const response = await cartsMongo.findAll();
        return response;
    }
    async getCartById(cid) {
        const cart = await cartsMongo.findById(cid);
        if(!cart) throw new Error('Cart not found'); 
        const response = await cartsMongo.model.findById(cid).populate('products',['title', 'price', 'code', 'quantity']);
        return response;
    }
    async createCart(cartData) {
        const {name, description} = cartData;
        if(!name || !description) throw new Error('some required data is missing');
        const response =await cartsMongo.createOne(cartData);
        return response;
    }
    async cartDelete(cid) {
        const cart = await cartsMongo.findById(cid);
        if(!cart) throw new Error('Cart not found');
        const response = await cartsMongo.deleteOne(cid);
        return response;
    }
    async cartUpdate(id,obj) {
        const response = await cartsMongo.model.updateOne({_id:id},{...obj});
        return response;
    }
    async productDelete(cid,pid) {
        const cart = await cartsMongo.findById(cid);
        if(!cart) throw new Error('Cart not found');
        const response = await cartsMongo.model.updateOne({_id:cid},{$pull:{products:pid}});
        return response;
    }
    async updateProduct(cid,pid,quantity) {
        const cart = await cartsMongo.findById(cid);
        if(!cart) throw new Error('Cart not found');
        const response = await cartsMongo.model.findById(cid).updateOne({_id:pid},{$inc:{quantity:quantity}});
    }
    async addProduct(cid,pid) {
        const cart = await cartsMongo.findById(cid);
        if(!cart) throw new Error('Cart not found');
        const response = await cartsMongo.model.findById(cid).updateOne({$push:{products:pid}});
        return response;
    }
}

export const cartsService = new CartsService()