//Libraries
const express=require('express');
const pool=require('./db');
const dotenv=require('dotenv');
const auth=require('./route/auth_router');
const dept=require('./route/dept_router');
const category=require('./route/category_router');
const brand=require('./route/brand_router');
const product=require('./route/product_router');
//Server_Config
const app=express();
dotenv.config();
const port=process.env.SRV_PORT;
app.use(express.json());
app.listen(port,()=>{console.log('Server is listening on URL http://127.0.0.1:'+port)});

//Routes
app.use('/auth',auth);
app.use('/dept',dept);
app.use('/category',category);
app.use('/brand',brand);
app.use('/product',product);


