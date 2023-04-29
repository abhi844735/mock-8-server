const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {Restmodel}=require("../models/restaurant.model");
const { auth } = require("../middlewares/auth");
require("dotenv").config();
const restRoute=express.Router();
const app=express();
app.use(express.json())

// get all list of restaurent
restRoute.get("/restaurants",async(req,res)=>{
    try {
        let data = await Restmodel.find();
        let arr=[];
        for(let i=0;i<data.length;i++){
            let obj={};
            obj._id=data[i]._id
            obj.name=data[i].name;
            obj.address=data[i].address;
            arr.push(obj)
        }
        res.send(arr);
    } catch (error) {
        res.send({message:error.message})
    }
})

// get restaurant by specific id
restRoute.get("/restaurants/:id",async(req,res)=>{
    try {
        let id =req.params.id
        let data = await Restmodel.findById(id);
        let obj={};
        obj.name=data.name;
        obj.address=data.address
        res.send(obj);
    } catch (error) {
        res.send({message:error.message})
    }
})
// add rstaurent api
restRoute.post("/addrestaurant",async(req,res)=>{
    try {
        // res.send(req.body)
        let data = await new Restmodel(req.body)
        await data.save();
        res.send({message:"restaurent added successfully"});
        
    } catch (error) {
        res.send({error:error.message})
    }
})
//get menu by specific id
restRoute.get("/restaurants/:id/menu",async(req,res)=>{
    try {
        let id =req.params.id
        let data = await Restmodel.findById(id);
        data=data.menu

        res.send(data);
    } catch (error) {
        res.send({message:error.message})
    }
})

///add menu to specific restaurent;
restRoute.patch("/restaurants/:id/menu",async(req,res)=>{
    try {
        let menu_data=req.body;
        // console.log(menu_data)
    let data = await Restmodel.findById(req.params.id);
    // console.log(data)
    let all_menus=data;
    all_menus.menu.push(menu_data);
   
  
    await Restmodel.findByIdAndUpdate({_id:req.params.id},all_menus)
    res.status(201).send({message:"menu added successfully"})
    

    } catch (error) {
        res.send({error:error.message})
    }
})

// delte specific menu by its id;
restRoute.delete("/restaurants/:id/menu/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        console.log(id);
        await Restmodel.findByIdAndDelete({_id:id});
        res.status(202).send({message:"menu deleted successfully"});
    } catch (error) {
        res.send({message:error.message})
    }
})


module.exports={restRoute}