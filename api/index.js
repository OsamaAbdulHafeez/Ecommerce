import express from "express"
import dotenv from 'dotenv'
import { dbConnection } from "./utils/dbConnection.js"
import authRouter from "./routes/authRouter.js"
import userRouter from './routes/userRouter.js'

const app = express()
dotenv.config()
dbConnection()
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Backend Server is running on ${PORT}`)
})