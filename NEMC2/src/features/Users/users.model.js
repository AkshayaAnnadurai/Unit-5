const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name: {type :String, required :true},
    email: { type :String, required :true,unique :true },
    password: {type :String, required :true},
    age: {type :Number, min: 20, max: 100},
    gender: {type :String }
})

const User=mongoose.model("user",userSchema)
module.exports=User

// 631efc4206e6130c8f6f9b83