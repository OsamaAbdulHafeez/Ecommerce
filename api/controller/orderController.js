import { ALREADYEXISTS, BADREQUEST, CREATED, FORBIDDEN, INTERNALERROR, OK } from '../constants/httpStatus.js'
import { responseMessages } from '../constants/responseMessages.js'
import OrderSchema from '../models/Order.js'


//API: /api/order/
//Request: POST
//Access: Current Order
// CREATE ORDER

export const createOrder = async (req, res) => {
    try {
        const newOrder = new OrderSchema(req.body)
        const saveOrder = await newOrder.save()
        res.status(CREATED).send({
            status: true,
            data: saveOrder
        })
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}


//API: /api/order/:id
//Request: PUT
//Access: Admin
// UPDATE ORDER

export const updateOrder = async (req, res) => {
    try {
        const newupdateOrder = await OrderSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(OK).send({
            status: true,
            message: responseMessages.CART_UPDATED,
            data: newupdateOrder
        })
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}

//API: /api/order/:id
//Request: DELETE
//Access: Admin
// DELETE ORDER

export const deleteOrder = async (req, res) => {
    try {
        await OrderSchema.findByIdAndDelete(req.params.id)
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
//Access: Current User
// GET USER ORDER

export const getOrder = async (req, res) => {
    try {
        const getUserOrder = await OrderSchema.find({ userId: req.params.id })
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: getUserOrder
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}


//API: /api/order
//Request: GET
//Access: Admin
// GET ALL ORDER

export const getAllOrder = async (req, res) => {
    try {
        const carts = await OrderSchema.find()
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


//API: /api/order/income
//Request: GET
//Access: Admin
// GET MONTHLY INCOME

export const getMonthlyIncome = async (req, res) => {
    try {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))
        const income = await OrderSchema.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.status(OK).json({
            status: true,
            data: income
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}

