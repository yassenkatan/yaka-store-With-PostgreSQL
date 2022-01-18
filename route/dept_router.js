const express=require('express');
const dept=require('../controller/dept_controller');
const router=express.Router();

//Add Dept
router.post('/add_dept',dept.add_dept);

//All Dept
router.get('/all_depts',dept.all_depts);

//Selected Dept
router.get('/:id',dept.selected_dept);

//Update Dept
router.put('/:id',dept.upd_dept);

//Delete Dept
router.delete('/:id',dept.del_dept);


module.exports=router;