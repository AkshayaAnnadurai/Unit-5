const express=require("express")
const Movies=require("./movie.model")
const app=express.Router()


// app.get("/",async(req,res)=>{
// let mov=await Movies.find().limit(10)
// res.send(mov)
// })


app.get("/search",async(req,res)=>{
    let {q} =req.query
    console.log(q)
    try{
    let mov=await Movies.find({movie_name:{$regex : q}})
    res.send(mov)
    }
    catch(err){
        console.log(err.message)
    }
})


app.get("/",async(req,res)=>{
    const{page=1,limit=5,orderBy="movie_name",order="asc"} =req.query
    try{
    let mov=await Movies.find({},{_id : 0 , movie_name :1 , id :1 ,movie_genres :1 ,runtime:1, year :1}).sort({[orderBy] :order === "asc" ? 1 : -1}).skip((page-1)*limit).limit(limit)
    res.send(mov)
    }
    catch(err)
    {
        console.log(err.message)
    }
})

app.post("/",async(req,res)=>{
    let mov=req.body
    try{
        let newmov=await Movies.create(mov)
        res.send(newmov)
    }
    catch(err){
        console.log(err.message)
    }
})

app.delete("/:id",(req,res)=>{
    let{id}=req.params
    Movies.findOneAndRemove({id :id}).then((user)=>{
        if(!user){
            res.send(id + "was not deleted" )
        }
        else
        {
            res.send(id + "was  deleted" )  
        }
    })
})
module.exports=app