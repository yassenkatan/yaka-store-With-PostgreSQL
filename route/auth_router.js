const express=require('express');
const auth=require('../controller/auth_controller');
const router=express.Router();

//SignUp
router.post('/signup',auth.signup);

//Login
router.post('/login',auth.login);

//All Users
router.get('/all_users',auth.all_users);

//Selected User
router.get('/user/:id',auth.selected_user);

module.exports=router;