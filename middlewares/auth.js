let jwt=require("jsonwebtoken");
require("dotenv").config();
let auth=(req,res,next)=>{
    try {
        let token=req.headers.authorization;
        if(token){
            let decoded=jwt.verify(token,process.env.key);
            if(decoded){
                let userId=decoded.userID;
                req.body.user=userId;
                next()

            }else{
                res.send({message:"not authorised invalid token"})
            }

        }else{
            res.send({message:"please login first"})
        }
    } catch (error) {
        res.send({message:error.message})
    }
}
module.exports={auth}