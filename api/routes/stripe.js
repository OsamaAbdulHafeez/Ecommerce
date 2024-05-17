import express from "express"
import Stripe from "stripe"
import dotenv from 'dotenv'
import { FORBIDDEN, OK } from "../constants/httpStatus.js";
dotenv.config()
const stripe = new Stripe(process.env.stripe_key);
const stripeRouter = express.Router()

stripeRouter.post('/payment', (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(FORBIDDEN).json({
                status: false,
                message: stripeErr
            })
        }else{
            res.status(OK).json({
                status: true,
                data:stripeRes
            })
        }
    })
})


export default stripeRouter