import UserSchema from '../models/User.js'
import { responseMessages } from '../constants/responseMessages.js'
import bcrypt, { compareSync } from "bcrypt"
import { ALREADYEXISTS, CREATED, FORBIDDEN, INTERNALERROR, NOTFOUND, OK } from '../constants/httpStatus.js'
import { GenerateToken } from '../utils/token.js'
//: /api/auth/register
//: POST
//: Public
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(BADREQUEST).send({
                status: false,
                message: responseMessages.MISSING_FIELDS
            })
        }
        const user = await UserSchema.findOne({ email: email })
        if (user) {
            return res.status(ALREADYEXISTS).send({
                status: false,
                message: responseMessages.USER_EXISTS
            })
        } else {
            const user = await UserSchema.findOne({ username: username })
            if (user) {
                return res.status(ALREADYEXISTS).send({
                    status: false,
                    message: responseMessages.USER_NAME_EXISTS
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(req.body.password, salt)
                const newUser = new UserSchema({
                    ...req.body,
                    password: hash
                })
                const savedUser = await newUser.save()
                if (savedUser.errors) {
                    return res.status(INTERNALERROR).send({
                        status: false,
                        message: errors.message
                    })
                } else {
                    savedUser.password = undefined;
                    return res.status(CREATED).send({
                        status: true,
                        message: responseMessages.SUCCESS_REGISTRATION,
                        data: savedUser
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//: /api/auth/login
//: POST
//: Public
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username && password) {
            let user = await UserSchema.findOne({ username: username });
            if (user) {
                const isValid = compareSync(password, user.password);
                if (user.username === username && isValid) {
                    user.password = undefined;
                    const token = GenerateToken({ data: user, expiresIn: '24h' });
                    res.cookie('token', token, { httpOnly: true });
                    res.status(OK).send({status: true,
                        message: 'Login Successful',
                        token,
                        data: user,
                    });
                } else {
                    return res
                        .status(OK)
                        .send({ status: false, message: responseMessages.UN_AUTHORIZED });
                }
            } else {
                return res
                    .status(NOTFOUND)
                    .send({ status: false, message: responseMessages.NO_USER });
            }
        } else {
            return res
                .status(500)
                .send("Missing fields");
        }
    } catch (error) {
        return res.status(500)
            .send(error.message)
    }
};