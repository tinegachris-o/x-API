require('dotenv').config()
const mongoose=require('mongoose')

const connectDB=()=>{
    let db=process.env.MONGO_URL
try {
    mongoose.connect(db)
console.log('database connected sucessfully');

} catch (error) {
    console.log('error connecting to databse');
    
}
}
module.exports=connectDB