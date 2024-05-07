import pkg from 'jsonwebtoken';
import { NOTALLOWED, UNAUTHORIZED } from '../constants/httpStatus.js';
import { responseMessages } from '../constants/responseMessages.js';
import dotenv from 'dotenv'
dotenv.config()
const { sign, verify } = pkg

export const GenerateToken = ({ data, expiresIn }) => {
    return sign({ result: data._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn,
    });
};

export const VerifyToken = (req, res, next) => {
    const token1 = req.headers.token;
    if (!token1) {
        return res.status(NOTALLOWED).send({
            status: false,
            message: responseMessages.NOT_A_TOKEN
        })
    }
    verify(token1, process.env.JWT_SECRET_KEY, (err, user) => {
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