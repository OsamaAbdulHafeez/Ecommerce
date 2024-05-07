import { FORBIDDEN, OK } from '../constants/httpStatus.js'
import { responseMessages } from '../constants/responseMessages.js'
import UserSchema from '../models/User.js'


export const updateUser = async (req, res) => {
    const userId = req.query.id
    const editUser = await UserSchema.findById(userId)
    try {
        if()
        const newUser = await UserSchema.findByIdAndUpdate(editUser._id, { $set: req.body }, { new: true })
        res.status(OK).send({
            status: true,
            message: responseMessages.UPDATE_SUCCESS_MESSAGES,
            data: newUser
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.UPDATE_UNSUCCESS_MESSAGES
        })
    }
}