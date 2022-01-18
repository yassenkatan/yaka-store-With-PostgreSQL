const express=require('express');
const brand=require('../controller/brand_controller');
const router=express.Router();


//Add Brand
router.post('/add_brand',brand.add_brand);

//All Brand 
router.get('/all_brands',brand.all_brands);

//Selected Brand
router.get('/:id',brand.selected_brand);

//Update Brand
router.put('/:id',brand.upd_brand);

//Delete Brand
router.delete('/:id',brand.del_brand);

module.exports=router;