const express=require("express")
const Task=require("./tasks.model")

const app=express.Router()

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
            res.status(401).send("Operation not allowed")
        }
    }
    else{
        res.status(401).send("Operation not allowed")
    }
}
app.use(authMiddleware)


app.get("/",async(req,res)=>{
    const{page=3,limit=5} =req.query
    try{
    let task=await Task.find({author:req.userId}).skip((page-1)*limit).limit(limit)
    res.send(task)
    }
    catch(err)
    {
        console.log(err.message)
    }
})

app.post("/",async(req,res)=>{
    let task=req.body
    try{
        let newtask=await Task.create(task)
        res.send(newtask)
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete("/:id",(req,res)=>{
    let{id}=req.params
    Task.findOneAndRemove({id :id}).then((user)=>{
        if(!user){
            res.send(id + "was not deleted" )
        }
        else
        {
            res.send(id + "was  deleted" )  
        }
    })
})

app.get("/:id",async(req,res)=>{
    let {id}=req.params
    try{
        const task=await Task.findById(id)
        return res.get(task)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})


module.exports=app