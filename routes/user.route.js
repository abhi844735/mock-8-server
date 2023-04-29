const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {Usermodel}=require("../models/user.model");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const userRoute=express.Router();
const app=express();
app.use(express.json())

// user register api
userRoute.post("/register",async(req,res)=>{
    try {
        let {name,email,password,address}=req.body;
        bcrypt.hash(password,5,async(err,secure_pass)=>{
            if(err){
                res.send(err.message);
            }else{
                let data = await new Usermodel({name,email,password:secure_pass,address});
                await data.save();
                res.status(201).send(`${name} has been registered `);
            }
        })
    } catch (error) {
        res.send(error.message);
    }
})

// user login api
userRoute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body;
        let data = await Usermodel.find({email})
        if(data.length>0){
            let dec_pass=data[0].password;
            let userID=data[0]._id;
            bcrypt.compare(password,dec_pass,(err,result)=>{
                if(err){
                    res.send({message:err.message})
                }else{
                    if(result){
                        let token=jwt.sign({userID},process.env.key);
                        res.status(201).send({message:`${data[0].name} has logged in `,token,data})
                    }else{
                        res.send({message:"wrong credentials"});
                    }
                }
            })
        }else{
            res.status(401).send({message:"Email Not Found"})
        }
        
    } catch (error) {
        res.send(error.message)
    }
})

// reset password user api
userRoute.patch("/:id/reset",auth,async(req,res)=>{
    try {
        let {currentPassword,newPassword}=req.body;
        let data =await Usermodel.findById({_id:req.params.id});
        let actualPass=data.password;
        bcrypt.compare(currentPassword,actualPass,async(err,result)=>{
            if(err){
                res.send({message:err.message})
            }
            else {
                if(result){
                    bcrypt.hash(newPassword,5,async(err,secure_pass)=>{
                        if(err){
                            res.send({message:err.message})
                        }else{
                            await Usermodel.findByIdAndUpdate({_id:req.params.id},{password:secure_pass});
                            res.send({message:"password reset successfully"});
                        }
                    })
                }else{
                    res.send({message:"current password doesn't match"});
                }
            }
        })

        
    } catch (error) {
       res.send({message:error.message})
    }
})

module.exports={userRoute}