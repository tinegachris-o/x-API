const mongoose= require('mongoose')
const PostSchema= new mongoose.Schema({
userId:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
},
img:{
    type:String,
dafault:""
},
likes:{
type:Array,
dafault:[]
}



}, {timestamps:true})
module.exports= mongoose.model("Posts",PostSchema)