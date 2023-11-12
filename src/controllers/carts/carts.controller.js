import { cartsService } from '../../services/carts/carts.service.js';
import { productsMongo } from '../../DAL/DAOs/MongoDAOs/productsMongo.dao.js';
import { usersMongo } from '../../DAL/DAOs/MongoDAOs/usersMongo.dao.js';


class CartsController {
  async createcart(req,res){
    const cartData = req.body;
    cartData.pucharse = cartData.email;
    console.log(cartData)
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

  async cartWhitOutStock(cid, withOutStock) {
    withOutStock.forEach(async e => {
      const q = e.quantity
      for (let i = 0; i<  q; i++) {
        await cartsService.cartUpdate(cid, e.id)
      }
      
    }
    )
    await cartsService.cartDelete(cid)
  }

  async pucharse (req, res){
    const {cid} = req.params;
    const sessionData = await cartsService.getCartById(cid);
    console.log('sessionData', sessionData);
    req.session['email'] = sessionData.pucharse;
    const cart = await cartsService.cartData(cid);
    console.log('interior de cart', cart);
    const purchase = cart.map(async e => {
      const prod = await productsMongo.findById(e.id)
      if (prod.stock < e.quantity) {
        return {
          stock: 0,
          id: prod.id,
          quantity: e.quantity,
          title: prod.title,
        }
      }else{
        prod.stock = prod.stock - e.quantity;
        await productsMongo.updateOne(e.id, {stock: prod.stock});
        return {
          quantity: e.quantity,
          title: e.title,
          price: e.price,
          total: e.total,
        }
      }
    })
    const stockValidate = await Promise.all(purchase);
    console.log('linea 103',stockValidate);
    const withOutStock = stockValidate.filter(e => e.stock == 0);
    console.log('withOutStock', withOutStock);
    const purchasePorducts = stockValidate.filter(e=> e.stock != 0);
    console.log('purchaseProducts', purchasePorducts);
    const totalAmount = purchasePorducts.reduce((acc,p) => acc + p.total, 0);
    console.log('totalAmount', totalAmount);
    req.session.purchaseProducts = purchasePorducts;
    req.session.userEmail = req.session.email;
    req.session.totalAmount = totalAmount;
    console.log(req.session);
    cartsController.cartWhitOutStock(cid, withOutStock);
  }

  
  
}

export const cartsController = new CartsController();
