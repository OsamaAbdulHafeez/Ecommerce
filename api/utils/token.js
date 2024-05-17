import pkg from 'jsonwebtoken';
import { NOTALLOWED, UNAUTHORIZED } from '../constants/httpStatus.js';
import { responseMessages } from '../constants/responseMessages.js';
import dotenv from 'dotenv'
import UserSchema from '../models/User.js'
dotenv.config()
const { sign, verify } = pkg

export const GenerateToken = ({ data, expiresIn }) => {
    return sign({ result: data._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn,
    });
};

export const VerifyToken = (req, res, next) => {
    const token1 = req.headers.token;
    const token = token1 && token1.split(" ")[1]
    if (!token1) {
        return res.status(NOTALLOWED).send({
            status: false,
            message: responseMessages.NOT_A_TOKEN
        })
    }
    verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(UNAUTHORIZED).send({
                status: false,
                message: responseMessages.TOKEN_INVALID
            })
        }
        req.user = user
        next()
    })
}
export const VerifyTokenAndAuthorization = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.result === req.params.id || req.user.isAdmin) {
            
            next()
        } else {
            res.status(UNAUTHORIZED).send({
                status: false,
                message: responseMessages.NOTALLOWED
            })
        }
    })

}

export const VerifyTokenAndAdmin = (req, res, next) => {
    VerifyToken(req, res, async() => {
        const user = await UserSchema.findById(req.user.result)
        if (user.isAdmin) {
            next()
        } else {
            res.status(UNAUTHORIZED).send({
                status: false,
                message: responseMessages.NOTALLOWED
            })
        }
    })

}