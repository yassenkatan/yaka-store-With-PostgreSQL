const express=require('express');
const category=require('../controller/category_controller');
const router=express.Router();


//Add Category
router.post('/add_category',category.add_cat);

//All Category
router.get('/all_categories',category.all_cat);

//Selected Category
router.get('/:id',category.selected_cat);

//Update Category
router.put('/:id',category.upd_cat);

//Delete Category
router.delete('/:id',category.del_cat);

module.exports=router;