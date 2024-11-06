require('dotenv').config()
const express= require('express')
const app= express()
let port =process.env.PORT || 5070
const postRoute= require('./routes/posts')
const morgan=require('morgan')
const userRoute= require('./routes/Users')
const authRoute= require('./routes/auth')
const connectDB= require('./connection')
const { default: helmet } = require('helmet')

///middleWares
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
//console.log(userRoute);

//routes 





////middleWare

app.use('/api/users' ,userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
const server= ()=>{
    try {
        connectDB()
        app.listen( port, console.log(`server is listening on port ${port}`)
)

    } catch (error) {
        console.log('error connecting to database ');
        
    }
}
server()