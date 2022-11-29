const express=require("express")
const  User=require("./users.model")

const app=express.Router()
app.get ("/",async(req,res)=>{
    let user=await User.find()
    res.send(user)

})

app.post("/",async(req,res)=>{
    let{email} =req.body
    try{
        let user=await User.findOne({email})
        if(user){
          return  res.status(404).send("cannot create with this email address")
        }
        let newUser=await User.create(req.body)
        res.send(
            
               { token : `${newUser.id}:${newUser.email}:${newUser.password}`,
                email:`${newUser.email}`,
                password:`${newUser.password}`,
                name:`${newUser.name}`,
                age:`${newUser.age}`,
                gender:`${newUser.email}`}

            
        )
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})
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





app.delete("/:id",(req,res)=>{
    let{id}=req.params
    User.findOneAndRemove({id :id}).then((user)=>{
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
        const user=await User.findById(id)
        return res.get(user)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

module.exports=app