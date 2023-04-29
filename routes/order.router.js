const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {Ordermodel}=require("../models/order.model");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const orderRoute=express.Router();
const app=express();
app.use(express.json())
// order post api
orderRoute.post("/orders",auth,async(req,res)=>{
    try {
        let orderDetails=await new Ordermodel(req.body);
        await orderDetails.save();
        res.status(201).send({message:"order placed successfully"});
    } catch (error) {
        res.send({error:error.message})
    }

})
// get order details by order id

orderRoute.get("/orders/:id",auth,async(req,res)=>{
    try {
        let orderDetails=await Ordermodel.findById(req.params.id);
       
        res.status(200).send({order:orderDetails});
    } catch (error) {
        res.send({error:error.message})
    }

})
orderRoute.patch("/orders/:id",auth,async(req,res)=>{
    try {
        let {status}=req.body;
        await Ordermodel.findByIdAndUpdate({_id:req.params.id},{status});
       
        res.send({message:"order status updated successfully"});
    } catch (error) {
        res.send({error:error.message})
    }

})

module.exports={orderRoute}