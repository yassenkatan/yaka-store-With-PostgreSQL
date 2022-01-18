const express=require('express');
const pool=require('../db');
const dotenv=require('dotenv');

//Product
//Add Product
const add_product=async (req,res)=>{
    try {
        let brand_id=req.body.brand_id;
        let name=req.body.name;
        let image=req.body.image;
        let rate=req.body.rate;
        let price=req.body.price;
        let color=req.body.color;
        let wieght=req.body.wieght;
        let matrial=req.body.matrial;
        let other=req.body.other;
        let creationdate=new Date();
        let product=await pool.query("INSERT INTO product (prod_name,image,rate,price,color,wieght,matrial,creationdate,other,brand_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[name,image,rate,price,color,wieght,matrial,creationdate,other,brand_id]);
        let product_info=await pool.query("SELECT brand.brand_name,category.cat_name,dept.dept_name from(((dept INNER JOIN category ON dept.dept_id=category.dept_id)INNER JOIN brand ON category.cat_id=brand.cat_id)INNER JOIN product ON brand.brand_id=product.brand_id) WHERE product.brand_id=$1 ",[brand_id]);
        res.send("New Product Added to: \n Brand : "+product_info.rows[0]["brand_name"]+"\n"+"Category : "+product_info.rows[0]["cat_name"]+"\n"+"Department : "+product_info.rows[0]["dept_name"]);

    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//All Products
const all_products=async (req,res)=>{
    try {
        let products=await pool.query("SELECT product.prod_id,product.prod_name,product.rate,product.price,product.color,product.wieght,product.creationdate::text,product.other,brand.brand_name,category.cat_name,dept.dept_name from(((dept INNER JOIN category ON dept.dept_id=category.dept_id)INNER JOIN brand ON category.cat_id=brand.cat_id)INNER JOIN product ON brand.brand_id=product.brand_id) ORDER BY product.prod_id");
        let prods=[];
        for(let i=0;i<products.rowCount;i++)
        {
            prods[i]="Department : "+products.rows[i]["dept_name"]+" - Category : "+products.rows[i]["cat_name"]+" - Brand : "+products.rows[i]["brand_name"]+" - ID : "+products.rows[i]["prod_id"]+" - Name : "+products.rows[i]["prod_name"]+" - Rate : "+products.rows[i]["rate"]+" - Price : "+products.rows[i]["price"]+" S.P - Color : "+products.rows[i]["color"]+" - Wieght : "+products.rows[i]["wieght"]+" - Creation Date : "+products.rows[i]["creationdate"]+" - Other Specifications : "+products.rows[i]["other"];
        }
        res.send(prods);
        
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

//Get Selected Product
const select_product=async(req,res)=>{
    try {
        let id=req.params.id;
        let sel_product=await pool.query("SELECT product.prod_id,product.prod_name,product.rate,product.price,product.color,product.wieght,product.creationdate::text,product.other,brand.brand_name,category.cat_name,dept.dept_name from(((dept INNER JOIN category ON dept.dept_id=category.dept_id)INNER JOIN brand ON category.cat_id=brand.cat_id)INNER JOIN product ON brand.brand_id=product.brand_id) WHERE prod_id=$1 ORDER BY product.prod_id",[id]);
        res.send("Department : "+sel_product.rows[0]["dept_name"]+" \n Category : "+sel_product.rows[0]["cat_name"]+" \n Brand : "+sel_product.rows[0]["brand_name"]+" \n ID : "+sel_product.rows[0]["prod_id"]+" \n Name : "+sel_product.rows[0]["prod_name"]+" \n Rate : "+sel_product.rows[0]["rate"]+" Stars \n Price : "+sel_product.rows[0]["price"]+" S.P \n Color : "+sel_product.rows[0]["color"]+" \n Wieght : "+sel_product.rows[0]["wieght"]+" \n Creation Date : "+sel_product.rows[0]["creationdate"]+" \n Other Specifications : "+sel_product.rows[0]["other"]);
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

//Update Product
const upd_product=async (req,res)=>{
try {
    let id=req.params.id;
    let name=req.body.name;
    let image=req.body.image;
    let rate=req.body.rate;
    let price=req.body.price;
    let color=req.body.color;
    let wieght=req.body.wieght;
    let matrial=req.body.matrial;
    let other=req.body.other;
    let product=await pool.query("UPDATE product SET prod_name=$1,image=$2,rate=$3,price=$4,color=$5,wieght=$6,matrial=$7,other=$8 WHERE prod_id=$9",[name,image,rate,price,color,wieght,matrial,other,id]);
    res.send("Product Updated Successfully ...");
} catch (err) {
    res.status(404).send("ERROR-404 : "+err.message);
}
}

//Delete Product
const del_product=async (req,res)=>{
    try {
        let id=req.params.id;
        let product =await pool.query("DELETE FROM product WHERE prod_id=$1",[id]);
        res.send("Product Deleted Successfully ...");
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

module.exports={
    add_product,
    all_products,
    select_product,
    upd_product,
    del_product
}