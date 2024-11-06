import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongodb from "./db/connectMongodb.js"
import AppError from "./utils/appError.js"
import errorController from "./controllers/error.controller.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/auth",authRoutes)


app.all('*',(req,res,next)=>{
  next(new AppError(`can't find ${req.originalUrl}`,404))
})

app.use(errorController)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  connectMongodb()
})