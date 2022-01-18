const express=require('express');
const pool=require('../db');
const dotenv=require('dotenv');

//Brand
//Add Brand
const add_brand=async (req,res)=>{
    try {
        let cat_id=req.body.cat_id;
        let name=req.body.name;
        let brand=await pool.query("INSERT INTO brand (brand_name,cat_id) VALUES ($1,$2)",[name,cat_id]);
        let cat_name=await pool.query("SELECT category.cat_name from brand INNER JOIN category ON brand.cat_id=category.cat_id WHERE brand.cat_id=$1 group by category.cat_id",[cat_id]);
        let cat_dept=await pool.query("SELECT dept.dept_name from category INNER JOIN dept ON dept.dept_id=category.dept_id WHERE cat_id=$1",[cat_id]);
        res.send("New Brand Added to Category : "+cat_name.rows[0]["cat_name"]+" - In Department : "+cat_dept.rows[0]["dept_name"]);
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

//All Brands
const all_brands=async (req,res)=>{
    try {
        let brands=await pool.query("select brand.brand_id,brand.brand_name,category.cat_name,dept.dept_name from ((dept INNER JOIN category ON dept.dept_id=category.dept_id)INNER JOIN brand ON category.cat_id=brand.cat_id) ORDER BY brand.brand_id ASC");
        let Brands=[];
        for(let i=0;i<brands.rowCount;i++)
        {
            Brands[i]="ID : "+brands.rows[i]["brand_id"]+" - Brand Name : "+brands.rows[i]["brand_name"]+" - Category Name : "+brands.rows[i]["cat_name"]+" - Department :  "+brands.rows[i]["dept_name"];
        }
        res.send(Brands);
        
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

//Get Selected Brand
const selected_brand=async (req,res)=>{
    try {
        let id=req.params.id;
        let brand=await pool.query("select brand.brand_id,brand.brand_name,category.cat_name,dept.dept_name from ((dept INNER JOIN category ON dept.dept_id=category.dept_id)INNER JOIN brand ON category.cat_id=brand.cat_id) where brand.brand_id=$1",[id]);
        res.send("ID : "+brand.rows[0]["brand_id"]+"\n"+"Brand Name : "+brand.rows[0]["brand_name"]+"\n"+"Category Name : "+brand.rows[0]["cat_name"]+"\n"+"Department Name : "+brand.rows[0]["dept_name"]);
    }
    catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}

//Update Brand
const upd_brand=async (req,res)=>{
    let id=req.params.id;
    let name=req.body.brand_name;
    let brand=await pool.query("UPDATE brand SET brand_name=$1 WHERE brand_id=$2",[name,id]);
    res.send("Brand Updated Successfully ...");
}

//Delete Brand
const del_brand=async (req,res)=>{
    try {
        let id=req.params.id;
        let brand=await pool.query("DELETE FROM brand WHERE brand_id=$1",[id]);
        res.send("Brand Deleted Successfully ...")
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}


module.exports={
    add_brand,
    all_brands,
    selected_brand,
    upd_brand,
    del_brand
}