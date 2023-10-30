import { cartsService } from '../../services/carts/carts.service.js';
import { productsMongo } from '../../DAL/DAOs/MongoDAOs/productsMongo.dao.js';
import { validateProductStock } from '../../middlewares/ticketMiddleware.js';
o.dao.js
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

  async purchase (req, res){
    const {cid} = req.params;
    if (!req.user){
      res.status(400).json({message: 'this user dont exist'})
    }
    const cart = await cartsService.cartData(cid);
    const purchase = cart.map(async e => {
      const prod = await productsMongo.findById(e.id)
      if (prod.stock < e.quantity) {
        return {
          stock: 0,
          id: prod.id,
          quantity: e.quantity,
          title: prod.title,
        }
      }
    })
    const stockValidate = await Promise.all(purchase);
    const withOutStock = validateProductStock.filter(e => e,stock == 0)
    const purchasePorducts = validateProductStock.filter(e=> e.stock != 0)
    const totalAmount = purchasePorducts.reduce((acc,p) => acc + p.total, 0)
    req.purchaseProducts = purchasePorducts
    req.userEmail = req.user.email
    req.totalAmount = totalAmount
    cartWhitOutStock(cid, withOutStock)
  }

  async cartWhitOutStock(cid, withOutStock) {
    await cartsService.cartDelete(cid)

    withOutStock.forEach(async e => {
      const q = e.quantity
      for (let i = 0; i<  q; i++) {
        await cartsService.cartUpdate(cid, e.id)
      }
      
    }
    )
  }
  
}

export const cartsController = new CartsController();
