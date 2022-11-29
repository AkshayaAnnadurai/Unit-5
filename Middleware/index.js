
const express=require("express")
const productRoutes=require("./routes/products.route")
const app=express()
app.use("/products",productRoutes)
app.listen(8080,(req,res)=>{
    console.log("started at http://localhost:8080")
})