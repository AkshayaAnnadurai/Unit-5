const express =require("express")

const app=express()

app.get( "/",(req,res)=>{
res.end("Welcome Akshaya")
})
app.get( "/products",(req,res)=>{
    res.end("Welcome Back")
    })
    app.post( "/products",(req,res)=>{
        res.send([1,2,3,4])
        })

app.listen(8080, ()=>{
    console.log("Server started on http://localhost:8080")
})