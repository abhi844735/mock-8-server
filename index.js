const express=require("express");
const app = express()
const connection=require("./config/db");
const { userRoute } = require("./routes/user.route");
const { restRoute } = require("./routes/restaurent.router");
const { orderRoute } = require("./routes/order.router");
require("dotenv").config();
app.use(express.json());
app.use("/user",userRoute)
app.use("/rest",restRoute)
app.use("/order",orderRoute)
app.get("/",(req,res)=>{
    try {
        res.send("hello this is mock-8-server")
    } catch (error) {
        res.send(error.message)
    }
})
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("connected to server")
})

