const mongoose=require("mongoose")

const connect=()=>{
   return mongoose.connect("mongodb://127.0.0.1:27017/IMDB")

}
module.exports=connect

// mongodb+srv://thani:thani@cluster0.acauyxg.mongodb.net/day-3

// mongodb+srv://Akshaya:Akshaya@99@cluster0.g7ulu70.mongodb.net/IMDB