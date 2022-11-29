const express=require("express")
const productdata=require("./products.model")
const app=express.Router()

app.get ("/",async(req,res)=>
{
let prod=await productdata.find().limit(5) 
try{

    res.send(prod)
}
catch(err){
    res.send(err.message)
}
}
)

module.exports=app