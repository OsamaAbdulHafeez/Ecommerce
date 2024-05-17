import { ALREADYEXISTS, BADREQUEST, CREATED, FORBIDDEN, INTERNALERROR, OK } from '../constants/httpStatus.js'
import { responseMessages } from '../constants/responseMessages.js'
import CartSchema from '../models/Cart.js'


//API: /api/cart/
//Request: POST
//Access: EveryWhere
// CREATE CART

export const createCart = async (req, res) => {
    try {
        const newCart = new CartSchema(req.body)
        const saveCart = await newCart.save()
        res.status(CREATED).send({
            status: true,
            data: saveCart
        })
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}


//API: /api/cart/:id
//Request: PUT
//Access: Current User
// UPDATE CART

export const updateCart = async (req, res) => {
    try {
        const newupdateCart = await CartSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(OK).send({
            status: true,
            message: responseMessages.CART_UPDATED,
            data: newupdateCart
        })
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}

//API: /api/cart/:id
//Request: DELETE
//Access: Current User
// DELETE CART

export const deleteCart = async (req, res) => {
    try {
        await CartSchema.findByIdAndDelete(req.params.id)
        res.status(OK).send({
            message: responseMessages.DELETED_SUCCESS_MESSAGES,
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.DELETED_UNSUCCESS_MESSAGES
        })
    }
}
//API: /api/cart/find/:userId
//Request: GET
//Access: All
// GET USER CART

export const getCart = async (req, res) => {
    try {
        const getUserCart = await CartSchema.findOne({userId:req.params.id})
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: getUserCart
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}


//API: /api/product/:id
//Request: GET
//Access: All
// GET ALL CART

export const getAllCart = async (req, res) => {
    try {
        const carts = await CartSchema.find()
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: carts
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}




