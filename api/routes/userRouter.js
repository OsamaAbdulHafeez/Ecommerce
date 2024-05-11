import express from "express"
import { VerifyTokenAndAdmin, VerifyTokenAndAuthorization } from "../utils/token.js"
import { deleteUser, getAllUser, getUser, updateUser, userStat } from "../controller/userController.js"


const userRouter = express.Router()

userRouter.put('/:id',VerifyTokenAndAuthorization,updateUser)
userRouter.delete('/:id',VerifyTokenAndAuthorization,deleteUser)
userRouter.get('/find/:id',VerifyTokenAndAdmin,getUser)
userRouter.get('/',VerifyTokenAndAdmin,getAllUser)
userRouter.get('/stat',VerifyTokenAndAdmin,userStat)

export default userRouter