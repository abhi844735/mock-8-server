const mongoose=require("mongoose");
const restSchema=mongoose.Schema({
    
       
    
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [{
        
          name: String,
          description: String,
          price: Number,
          image: String
        }, { _id: true }]
      
      
      
      
})
const Restmodel=mongoose.model("restaurents",restSchema);
module.exports={Restmodel}