const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 50,
      min: 2,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 50,
      min: 2,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      min: 2,
    },
    profilepicture: {
      type: String,
      default: "",
    },
    coverpicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: ''
    },
    followings: {
      type: Array,
      default: ''
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    relationShip:{
        type:Number,
        enum:[1,3,3]
    },
    from: {
      type: String,
      max: 50,
    },
    isAdmin:{
      type: Boolean,
      dafault: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
