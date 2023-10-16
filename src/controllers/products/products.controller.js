import {productsService} from '../../services/products/products.service.js';

class ProductsController {
    async getAllProducts(req,res) {
      try {
        const products = await productsService.getPorducts(req.query); 
        res.status(200).json({products});
      } catch (error) {
        res.status(500).json({error});
      }
    }
    async getProductById(req, res) {
        const {pid} = req.params
        try {
          const product = await productsService.getProductById(pid);
          res.status(200).json({message:'this product is',product});  
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }
    async addProduct(req, res) {
      try {
        const newProduct = await productsService.addProduct(req.body);
        res.status(200).json({message:'New product created',newProduct});
      } catch (error) {
          res.status(400).json({message:error.message});
      }
    }
    async updateProduct(req, res) {
      const {pid} = req.params;
      try {
        const result = await productsService.updateProduct(pid, req.body);
        res.status(200).json({message:'Product updated successfully',result});
      } catch (error) {
          res.status(400).json({message:error.message});
      }  
    }
    async productDelete(req, res) {
        const {pid} = req.params;
        try {
          const result = await productsService.deleteProduct(pid);  
          res.status(200).json({message:'Product deleted successfully'});
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }

}

export const productsController = new ProductsController();