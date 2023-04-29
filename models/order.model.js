const mongoose=require("mongoose");
const orderSchema=mongoose.Schema({
    
       
    
       
        user :"String",
        restaurant :"String",
      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],
      totalPrice: Number,
      deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status: {type:String,enum:["placed","preparing","on the way", "delivered"]} 
   
      
})
const Ordermodel=mongoose.model("orders",orderSchema);
module.exports={Ordermodel}