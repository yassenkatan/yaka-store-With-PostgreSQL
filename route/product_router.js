const express=require('express');
const product=require('../controller/product_controller');
const router=express.Router();

//Add Product
router.post('/add_product',product.add_product);

//All Product
router.get('/all_products',product.all_products);

//Selcted Product
router.get('/:id',product.select_product);

//Update Product
router.patch('/:id',product.upd_product);

//Delete Product
router.delete('/:id',product.del_product);


module.exports=router;