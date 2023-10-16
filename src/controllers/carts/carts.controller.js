import { cartsService } from '../../services/carts/carts.service.js'

class CartsController {
  async createcart(req,res){
    const cartData = req.body;
    try{
         const createCart = await cartsService.createCart(cartData);
         res.status(200).json({message:'Cart created successfully', cart:createCart})
    } catch (error) {
        res.status(400).json({message: error.message}) 
    }
  }
  async addProduct(req,res){
    const {cid,pid} = req.params;
    try {
          const newProduct = await cartsService.addProduct(cid,pid);
          res.status(200).json({message:'Product added successfully', product:newProduct});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  }
  async productDelete(req,res){
    const {cid,pid} = req.params;
    try {
       const result = await cartsService.productDelete(cid,pid);
       res.status(200).json({message:'Product deleted successfully'}); 
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  }
  async getCart(req,res){
    const {cid} = req.params;
    try {
       const result = await cartsService.getCartById(cid);
       res.status(200).json({message:'This is your cart', cart:result}); 
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  }
  async updateProduct(req,res){
    const {cid,pid} = req.params;
    const {quantity} = req.body;
    try {
      const result = await cartsService.updateProduct(cid,pid,quantity);
      res.status(200).json({message:'Your product has been updated', product:result});  
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  }
  async cartDelete(req,res){
    const {cid} = req.params;
    try {
      const result = await cartsService.cartDelete(cid);
      res.status(200).json({message:'Your cart has been deleted'});   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
  }
}

export const cartsController = new CartsController();
