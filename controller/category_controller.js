const express=require('express');
const pool=require('../db');
const dotenv=require('dotenv');

//Category
//Add Category
const add_cat=async (req,res)=>{
    try {
        let dept_id=req.body.dept_id;
        let name=req.body.name;
        let cat=await pool.query("INSERT INTO category (cat_name,dept_id) VALUES ($1,$2)",[name,dept_id]);
        let dept_name=await pool.query("SELECT dept.dept_name from category INNER JOIN dept ON dept.dept_id=category.dept_id WHERE category.dept_id=$1 group by dept.dept_id",[dept_id]);
        res.send("New Category Added to "+dept_name.rows[0]["dept_name"]+" Department");
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//All Category
const all_cat=async (req,res)=>{
    try {
        let cat=await pool.query("SELECT category.cat_id,category.cat_name,dept.dept_name FROM category INNER JOIN dept ON dept.dept_id=category.dept_id order by cat_id");
        let rowC=cat.rowCount;
        let  category=[];
        for(let i=0;i<rowC;i++)
        {
            category[i]="ID : "+cat.rows[i]["cat_id"]+" - "+"Category Name : "+cat.rows[i]["cat_name"]+" - "+"Depatment Name : "+cat.rows[i]["dept_name"];
            
        }
        res.send(category);
        
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//Get Selected Category
const selected_cat=async (req,res)=>{
    try {
        let id=req.params.id;
        let cat=await pool.query("SELECT cat_id,cat_name FROM category WHERE cat_id=$1",[id]);
        let cat_dept=await pool.query("SELECT dept.dept_name from category INNER JOIN dept ON dept.dept_id=category.dept_id WHERE cat_id=$1",[id]);
        res.send("ID : "+cat.rows[0]["cat_id"]+"\n"+"Category Name : "+cat.rows[0]["cat_name"]+"\n"+"Department Name : "+cat_dept.rows[0]["dept_name"]);
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//Update Category
const upd_cat=async (req,res)=>{
    let id=req.params.id;
    let name=req.body.name;
    let dept=await pool.query("UPDATE category SET cat_name=$1 WHERE cat_id=$2",[name,id]);
    res.send("Category Updated Successfully ...");
}
//Delete Category
const del_cat=async (req,res)=>{
    try {
        let id=req.params.id;
        let cat=await pool.query("DELETE FROM category WHERE cat_id=$1",[id]);
        res.send("Category Deleted Successfully ...")
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}


module.exports={
    add_cat,
    all_cat,
    selected_cat,
    upd_cat,
    del_cat
}