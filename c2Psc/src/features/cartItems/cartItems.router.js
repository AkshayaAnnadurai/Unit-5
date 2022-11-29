const express=require("express")
const Cart=require("./cartItems.model")
let User=require("../users/users.model")
const authMiddleware=async(req,res,next)=>{
    let token =req.headers.token
    if(token)
    {
    let[id,email,password] =token.split(":")

    let user=await User.findById(id)
    if(user.email=== email && user.password === password)
    {
        req.userId= id
        next()
    }
        else{
            res.status(401).send("cannnot Perform")
        }
    }
    else{
        res.status(401).send("cannnot Perform")
    }
}
const app=express.Router()

app.use(authMiddleware)
app.get("/" ,async(req,res)=>{
let items=await Cart.find({userId : req.userId})
res.send(items)
})

app.post("/" ,async(req,res)=>{
    try{
    let item=await Cart.create({
        ...req.body,
        userId : req.userId
    })
     return res.send(item)
    }
    catch(e)
    {
        res.status(500).send(e.message)
    }
})

module.exports=app