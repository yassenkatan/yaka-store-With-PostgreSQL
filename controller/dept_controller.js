const express=require('express');
const pool=require('../db');
const dotenv=require('dotenv');

//Dept
//Add Department
const add_dept=async (req,res)=>{
    try {
        let name=req.body.name;
        let dept=await pool.query("INSERT INTO dept (dept_name) VALUES ($1)",[name]);
        res.send("New Department Added Successfully ...")
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//All Departments
const all_depts=async (req,res)=>{
    try {
        let depts=await pool.query("SELECT dept_id,dept_name FROM dept ORDER BY dept_id ASC");
        res.send(depts.rows);
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//Get Selected Department
const selected_dept=async (req,res)=>{
    try {
        let id=req.params.id;
        let dept=await pool.query("SELECT dept_id,dept_name FROM dept WHERE dept_id=$1",[id]);
        res.send("ID : "+dept.rows[0]["dept_id"]+"\n"+"Name : "+dept.rows[0]["dept_name"]);
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}
//Update Department
const upd_dept=async (req,res)=>{
    let id=req.params.id;
    let name=req.body.name;
    let dept=await pool.query("UPDATE dept SET dept_name=$1 WHERE dept_id=$2",[name,id]);
    res.send("Department Name Updated Successfully ...");
}
//Delete Department
const del_dept=async (req,res)=>{
    try {
        let id=req.params.id;
        let dept=await pool.query("DELETE FROM dept WHERE dept_id=$1",[id]);
        res.send("Department Deleted Successfully ...")
    } catch (err) {
        res.status(404).send("ERROR-404 : "+err.message);
    }
}


module.exports={
    add_dept,
    upd_dept,
    selected_dept,
    del_dept,
    all_depts
}