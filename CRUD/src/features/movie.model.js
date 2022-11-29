const mongoose=require("mongoose")

const moviesSchema=new mongoose.Schema({
id:{ type : Number },
movie_name : {type :String,required :true, unique:true},
movie_genres :{type:String},
year:{type : Number },
release_date :{type:Date},
runtime:{type : Number,min:20,max:100}
})

const Movies=mongoose.model("movie",moviesSchema)

module.exports=Movies