
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export const signup = catchAsync( async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase()
  const {fullName, username, email, password} = req.body
  

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser =  new User({
    fullName,
    username,
    email,
    password: hashedPassword
  })

  if(newUser){
    generateTokenAndSetCookie(newUser._id, res)
    await newUser.save()
  }else{
    return next( new AppError("Invalid User Data", 400))
  }

  res.status(201).json({
    data: {
      user: newUser
    }
  })
})

export const login = () => {}

export const logout = () => {}