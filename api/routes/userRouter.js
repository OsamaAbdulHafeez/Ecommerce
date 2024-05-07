import express from "express"
import { VerifyToken } from "../utils/token.js"
import { updateUser } from "../controller/userController.js"


const userRouter = express.Router()

userRouter.put('/:id',VerifyToken,updateUser)

export default authRouter