import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'This email is already in use'],
    lowercase: true,
    validate: [validator.isEmail,`Please enter valid email`],
  },
  password: {
    type: String,
    required: [true, 'The user must have a password'],
    validate: [validator.isStrongPassword,`Password must be strong.`],
    select:false
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: "User",
    default: []
  }],
  followings: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: "User",
    default: []
  }],
  profileImgUrl: {
    type: String,
    default: ""
  },
  coverImgUrl: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User
