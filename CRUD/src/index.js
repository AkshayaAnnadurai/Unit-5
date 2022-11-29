const express=require("express")
const dbConnect=require("../config/db")
const moviesdata=require("./features/movies.routes")
const app=express()
app.use(express.json())

app.use("/movies",moviesdata)
app.listen(8000,async()=>{
    await dbConnect()
    console.log("Started at http://localhost:8000")
})