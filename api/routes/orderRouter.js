import express from "express"
import { VerifyToken, VerifyTokenAndAdmin, VerifyTokenAndAuthorization } from "../utils/token.js"
import { createOrder, deleteOrder, getAllOrder, getMonthlyIncome, getOrder, updateOrder } from "../controller/orderController.js"



const orderRouter = express.Router()

orderRouter.post('/',VerifyToken,createOrder)
orderRouter.put('/:id',VerifyTokenAndAdmin,updateOrder)
orderRouter.delete('/:id',VerifyTokenAndAdmin,deleteOrder)
orderRouter.get('/find/:userId',VerifyTokenAndAuthorization,getOrder)
orderRouter.get('/',VerifyTokenAndAdmin,getAllOrder)
orderRouter.get('/income',getMonthlyIncome)


export default orderRouter