const express=require("express")
const User=require("./users.model")

const app=express.Router()

app.post("/login",async(req,res)=>{
    let {email,password} = req.body
    let user=await User.findOne({email,password})
    try{
    if(!user){
         return res.status(401).send("Authentication failed")   
        }
        res.send(
            {
                token : `${user.id}:${user.email}:${user.password}`
            }
        )
    }
    catch(err){
        res.status(500).send(err.message)
    }
})


app.post("/signup",async(req,res)=>{
    let{email} =req.body
    try{
        let user=await User.findOne({email})
        if(user){
          return  res.status(404).send("cannot create with this email address")
        }
        let newUser=await User.create(req.body)
        res.send(
            {
                token : `${newUser.id}:${newUser.email}`
            }
        )
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

module.exports=app