import express from "express"
import { VerifyToken, VerifyTokenAndAdmin, VerifyTokenAndAuthorization } from "../utils/token.js"
import { createCart, deleteCart, getAllCart, getCart, updateCart } from "../controller/cartController.js"



const cartRouter = express.Router()

cartRouter.post('/',VerifyToken,createCart)
cartRouter.put('/:id',VerifyTokenAndAuthorization,updateCart)
cartRouter.delete('/:id',VerifyTokenAndAuthorization,deleteCart)
cartRouter.get('/find/:userId',VerifyTokenAndAuthorization,getCart)
cartRouter.get('/',VerifyTokenAndAdmin,getAllCart)


export default cartRouter