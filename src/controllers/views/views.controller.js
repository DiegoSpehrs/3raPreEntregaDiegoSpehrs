import { productsService } from "../../services/products/products.service.js";

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

}


export const viewsController = new ViewsController();



