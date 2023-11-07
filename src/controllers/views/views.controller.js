import { productsService } from "../../services/products/products.service.js";
import { cartsService } from "../../services/carts/carts.service.js";

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
        console.log(req.session);
        const cart = await cartsService.cartData(req.session.user.cartID);
        const total = await cartsService.totalPriceCart(cart);
        const purchase = `/api/carts/${req.session.user.cartId}/purchase`
        res.render('cartView',{cart,total,purchase})
    }

}


export const viewsController = new ViewsController();



