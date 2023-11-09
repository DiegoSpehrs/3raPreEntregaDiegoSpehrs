import { productsService } from "../../services/products/products.service.js";
import { cartsService } from "../../services/carts/carts.service.js";
import {usersMongo} from "../../DAL/DAOs/MongoDAOs/usersMongo.dao.js"

class ViewsController {
    async homeRender(req,res){
        const allProducts = await productsService.getPorducts();
        res.render("bodyHome", {products: allProducts});
    }
    async realTimeRender(req,res){
        const allProducts = await productsService.getPorducts();
        res.render("realTimeProducts", {products: allProducts});
    }
    loginRender(req,res){
        res.render("login");
    }
    singupRender(req,res){
        res.render("singup");
    }
    adminHomeRender(req,res){
        res.render("adminHome");
    }
    clientHomeRender(req,res){
        res.render("clientHome");
    }
    
    async cartRender(req,res){
        const pucharse = req.session.email;
        const newCart = await cartsService.createCart(pucharse);
        console.log('carrito creado',newCart);
        req.session['cartId'] = newCart.id;
        console.log('control de que se agrege cartId al session',req.session);
        const {cartId, email} = req.session;
        console.log(cartId,email);
        const linkCart = await usersMongo.addCart({cartId, email});
        console.log('control de linkeo de carrito al user',linkCart);
        const cart = await cartsService.cartData(cartId);
        const total = await cartsService.totalPriceCart(cart);
        const purchase = `/api/carts/${cartId}/purchase`
        res.render('cartView',{cart,total,purchase})
    }

}


export const viewsController = new ViewsController();



