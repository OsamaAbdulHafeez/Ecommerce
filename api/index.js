import express from "express"
import dotenv from 'dotenv'
import { dbConnection } from "./utils/dbConnection.js"
import authRouter from "./routes/authRouter.js"
import userRouter from './routes/userRouter.js'
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"
import stripeRouter from "./routes/stripe.js"
import cors from 'cors'
const app = express()
dotenv.config()
dbConnection()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api',stripeRouter)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Backend Server is running on ${PORT}`)
})