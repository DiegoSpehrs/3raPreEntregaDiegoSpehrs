import { Router } from "express";
import { cartsController } from "../controllers/carts/carts.controller.js";


const router = Router();

router.post('/', cartsController.createcart);

router.post('/:cid/products/:pid', cartsController.addProduct);

router.delete('/:cid/products/:pid', cartsController.productDelete);

router.put('/:cid', cartsController.getCart);

router.put('/:cid/products/:pid', cartsController.updateProduct);

router.delete('/:cid', cartsController.cartDelete);

export default router