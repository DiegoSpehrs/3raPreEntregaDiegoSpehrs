import { productsMongo } from '../DAL/DAOs/MongoDAOs/productsMongo.dao.js';

export const validateProductStock = async (product) => {
    const {quantity, id} = product;
    const productDb = await productsMongo.findById(id);
    if(quantity <= productDb.stock){
      const newStock = quantity - productDb.stock;
      const result = await productsMongo.model.findById(id).updateOne({stock: newStock});
      return result
    }else{
      throw new Error('no hay suficiente stock del producto');
    }
  }


  /*
export const purchase = async (req, res, next) => {
    const { cid } = req.params
    if (!req.user) {
        res.status(400).json({ mesage: "no exist a user" })
    }else{const { email, first_name } = req.user
    const userdto = { email, first_name }
    const userCart = await cartdata(cid)
    const purchase = userCart.map(async e => {
        const prod = await productMongo.getproductById(e.id)
        if (prod.stock < e.quantity) {
            return {
                stock: 0,
                id: prod.id,
                quantity: e.quantity,
                title: prod.title
            }
        }
        else {
            prod.stock = prod.stock - e.quantity
            await productMongo.updateProduct(e.id, { stock: prod.stock })
            return {
                quantity: e.quantity,
                title: e.title,
                price: e.price,
                total: e.total
            }
        }
    })
    const validateStock = await Promise.all(purchase)
    const withOutStock = validateStock.filter(e => e.stock == 0)
    const purchaseProds = validateStock.filter(e => e.stock != 0)
    const totalAmount = purchaseProds.reduce((acc, p) => acc + p.total, 0);
    req.purchaseProds = purchaseProds
    req.userEmail = userdto
    req.totalAmount = totalAmount
    cartwhitoutstock(cid, withOutStock)

  */