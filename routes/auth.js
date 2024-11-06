const router= require('express').Router()
const User= require('../models/Users')
const bcrypt= require('bcryptjs')
//Register
router.post("/register", async(req,res)=>{
    
   try {
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    const newUser=  new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    const user=  await newUser.save()
    
    res.json({user}).status(200).send('awsome')
   } catch (error) {
    res.json({error:"eror registring user "}).status(500)
   }
})
//login page
router.post("/login",async (req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email})
        
        !user && res.status(404).json("user not found")
        
const validPassword= await bcrypt.compare(req.body.password, user.password)
!validPassword && res.status(400).json('wrong password')
res.status(200).json({msg:'welcome in client',user})
    } catch (error) {
        res.status(500).json({msg:"error logging in"})
    }
})

router.get('/',(req,res)=>{
    res.send('this is a auth router')
})

module.exports=router