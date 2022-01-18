const express=require('express');
const pool=require('../db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');

//SignUp
const signup=async (req,res)=>{
    try{
        let {fullname,email,password,confirmPassword,isAdmin}=req.body;
        //Encrypt Password
        let passwordEncrypted=await bcrypt.hash(password,10);
        let passwordConfirmEncrypted=await bcrypt.hash(confirmPassword,10);
        //Check if user Exist
        let userExist=await pool.query("SELECT email from users WHERE email=$1",[email]);
        if(userExist.rows[0]==undefined){
             //Check password is same confirm password 
            if(password==confirmPassword)
            {
                const token=jwt.sign({email},process.env.TOKEN_KEY,{expiresIn:"2h"});
                let newUser=await pool.query("INSERT INTO users (fullname,email,password,confirmPassword,isAdmin,token) VALUES ($1,$2,$3,$4,$5,$6)",[fullname,email,passwordEncrypted,passwordConfirmEncrypted,isAdmin,token]);
                res.send(fullname+' Is New User Added ...');
            }
            else if(password!=passwordConfirm)
            {
                res.send('Password not confirmed ...');
            }
        }     
        else{    
            res.send('This Email '+email+ ' Already Exist ...');
        }     
    }
    catch(err){
        res.status(404).send("ERROR MSG : "+err.message);
    }  
}

//Login Function
    const login = async(req,res)=>{
    try {
        let email=req.body.email;
        let password=req.body.password;
        let user=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        //Decrypte Password
        if(user.rows[0]["email"]!=email){
            res.send('Invalid Email ...');
        }
        let passwordEncrypted=user.rows[0]["password"];
        let passwordDecrypt=await bcrypt.compare(password,passwordEncrypted);
        
        //Check if user true
        if(user.rows[0]["email"]==email && passwordDecrypt==true)
            {
                let user_Role=user.rows[0]["isAdmin"];
                const token=jwt.sign({email},process.env.TOKEN_KEY,{expiresIn:"2h"});
                res.send("Welcome "+user.rows[0]["fullname"]+" to YaKa-Store ...")
                // //check user priv
                // if(isAdmin==true)
                // {
                //     res.send('Welcome '+user_signedIn.fullname+' with Administrator Roles ..');
                // }   
                // else if(isAdmin==false)
                // {
                //     res.send('Welcome '+user_signedIn.fullname+' with User Roles ..');
                // }
            }
            else if(passwordDecrypt==false){
                    res.send('Invalid Password ...');
                }  
    } catch (err) {
        res.status(404).send("ERROR MSG : "+err.message);
    }
}

//All Users Function
const all_users=async(req,res)=>{
    try{
        //select all users from DB
        let users=await pool.query("SELECT usr_id,fullname,email FROM users ORDER BY usr_id ASC");
        let rowCount=users.rowCount;
        let user=[];
        for(let i=0;i<rowCount;i++)
        {
            user[i]="ID : "+users.rows[i]["usr_id"]+" - "+"Fullname : "+users.rows[i]["fullname"]+" - "+"Email : "+users.rows[i]["email"];
    }
    res.send(user);
        
    }    
    catch(err){
        res.status(404).send("ERROR MSG : "+err.message);
    }
}

//Get User Selected
const selected_user=async (req,res)=>{
    try {
        let id=req.params.id;
        let user=await pool.query("SELECT usr_id,fullname,email FROM users WHERE usr_id=$1",[id]);
        res.status(200).send("ID : "+user.rows[0]["usr_id"]+"\n"+"Fullname : "+user.rows[0]["fullname"]+"\n"+"Email : "+user.rows[0]["email"]);

    } catch (err) {
        res.status(404).send("ERROR MSG : "+err.message);
    }
}
module.exports={
    signup,
    all_users,
    login,
    selected_user
}