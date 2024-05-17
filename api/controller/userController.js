import { ALREADYEXISTS, FORBIDDEN, OK } from '../constants/httpStatus.js'
import { responseMessages } from '../constants/responseMessages.js'
import UserSchema from '../models/User.js'

//API: /api/user/:id
//Request: PUT
//Access: Private
// UPDATE USER

export const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body
        const user = await UserSchema.findOne({ email: email })
        if (user && user._id.toString() !== req.params.id) {
            return res.status(ALREADYEXISTS).send({
                status: false,
                message: responseMessages.USER_EXISTS
            })
        } else {
            const user = await UserSchema.findOne({ username: username })
            if (user && user._id.toString() !== req.params.id) {
                return res.status(ALREADYEXISTS).send({
                    status: false,
                    message: responseMessages.USER_NAME_EXISTS
                })
            } else {
                const newUser = await UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                return res.status(OK).send({
                    status: true,
                    message: responseMessages.UPDATE_SUCCESS_MESSAGES,
                    data: newUser
                })
            }
        }
    } catch (error) {
        return res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.UPDATE_UNSUCCESS_MESSAGES
        })
    }
}

//API: /api/user/:id
//Request: DELETE
//Access: Private
// DELETE USER

export const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id)
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

//API: /api/user/find/:id
//Request: GET
//Access: Admin
// GET USER

export const getUser = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.params.id)
        user.password = undefined
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: user
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}

//API: /api/user/
//Request: GET
//Access: Admin
// GET ALL USER

export const getAllUser = async (req, res) => {
    try {
        const query = req.query.new
        const users = query ? await UserSchema.find().sort({ createdAt: -1 }).limit(5) : await UserSchema.find()
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: users
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}

//API: /api/user/stat
//Request: GET
//Access: Admin
// GET STAT

export const userStat = async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    console.log(lastYear)
    try {
        const data = await UserSchema.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.send(data)
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}