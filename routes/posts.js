const router = require("express").Router();
const Post = require("../models/Post");
const User= require('../models/Users')
// create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update a post
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    await Post.updateOne({ $set: req.body });
    res.status(200).json("post has been updated");
  } else {
    res.status(403).json("you can only update your post");
  }
});
//delete one
router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json("post deleted");
});
//like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//timeline posts
/*router.get("/timeline/all",async(req,res)=>{

    try {
        const currentUser= await User.findById(req.params.id)
        const userPosts= await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return  Post.find({userId:friendId})
            })
    
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
    })*/


    router.get("/timeline/all/:id", async (req, res) => {
        try {
          const currentUser = await User.findById(req.params.id);
          if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          const userPosts = await Post.find({ userId: currentUser._id });
          const friendPosts = await Promise.all(
            currentUser.followings.map(async (friendId) => {
              return await Post.find({ userId: friendId });
            })
          );
      
          res.json([...userPosts, ...friendPosts.flat()]);
        } catch (error) {
          console.error("Error fetching timeline:", error);
          res.status(500).json({ message: "Internal server error", error: error.message });
        }
      });
      

module.exports = router;
