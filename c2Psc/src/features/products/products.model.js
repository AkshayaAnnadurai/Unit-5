const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
name : {type : String ,required :true},
description : {type : String },
price : {type : Number ,required :true, min :0 ,max :400 },
quantity : {type : Number,min :0 ,max:100 ,required :true}

})

const Products=mongoose.model("product",productSchema)
module.exports=Products