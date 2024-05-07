import express from "express"
import dotenv from 'dotenv'
import { dbConnection } from "./utils/dbConnection.js"
import authRouter from "./routes/authRouter.js"

const app = express()
dotenv.config()
dbConnection()
app.use(express.json())
app.use('/api/auth',authRouter)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Backend Server is running on ${PORT}`)
})