const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

router.get("/", (req, res) => {
  res.send("this is a users router");
});

// Mock middleware to set req.user for testing purposes
const mockUser = (req, res, next) => {
  req.user = { userId: "someUserId", isAdmin: true }; // Mock data for testing
  next();
};

// Update a user with mockUser middleware applied to the route
router.put("/:id",  async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(12);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({ msg: "updation is successfully" ,user});
      } catch (error) {
        res.status(500).json({ msg: "error in updating" });
      }
    } else {
      return res.status(403).json({ msg: "you can only update your account" });
    }
  });




  router.delete("/:id",  async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      
      try {
        const user = await User.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({ msg: "deletion is successful"});
      } catch (error) {
        res.status(500).json({ msg: "error in  deleting account" });
      }
    } else {
      return res.status(403).json({ msg: "you can only delete  your account" });
    }
  });

  //get a user
  router.get('/:id',async(req,res)=>{
    try {
        const user= await User.findById({_id:req.params.id})
        const {password,updatedAt,...other}=user._doc

        !user && res.status(404).json({msg:"user not found"})
        res.status(200).json({other})
    } catch (error) {
        res.json(error)
    }
  })

// followe user

router.put("/:id/follow", async(req,res)=>{   
    if(req.body.userId !==req.params.id){
        const user= await User.findById(req.params.id)
        const currentUser= await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{followings:req.params.id}})

        }res.status(200).json("user has been followed")
    }else{
        res.status(403).json('you cannot follow yourself')
    }
})

// unfollow

router.put("/:id/unfollow", async(req,res)=>{   
    if(req.body.userId !==req.params.id){
        const user= await User.findById(req.params.id)
        const currentUser= await User.findById(req.body.userId)
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull:{followers:req.body.userId}})
            await currentUser.updateOne({$pull:{followings:req.params.id}})

        }res.status(200).json("user has been unfollowed")
    }else{
        res.status(403).json('you cannot follow yourself')
    }
})


module.exports = router;
