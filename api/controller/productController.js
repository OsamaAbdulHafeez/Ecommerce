import { ALREADYEXISTS, BADREQUEST, CREATED, FORBIDDEN, INTERNALERROR, OK } from '../constants/httpStatus.js'
import { responseMessages } from '../constants/responseMessages.js'
import ProductSchema from '../models/Product.js'


//API: /api/product/
//Request: POST
//Access: Admin
// CREATE PRODUCT

export const createProduct = async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body
        if (!title || !desc || !img || !categories || !size || !color || !price) {
            res.status(BADREQUEST).send({
                status: false,
                message: responseMessages.MISSING_FIELDS
            })
        } else {
            const product = await ProductSchema.findOne({ title: title })
            if (product) {
                res.status(ALREADYEXISTS).send({
                    status: false,
                    message: responseMessages.DUPLICATE_ERROR
                })
            } else {
                const newProduct = new ProductSchema(req.body)
                const saveProduct = await newProduct.save()
                res.status(CREATED).send({
                    status: true,
                    message: responseMessages.PRODUCT_CREATED,
                    data: saveProduct
                })
            }
        }
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}


//API: /api/product/:id
//Request: PUT
//Access: Admin
// UPDATE PRODUCT

export const updateProduct = async (req, res) => {
    try {
        const { title, desc, img, categories, size, color, price } = req.body
        const product = await ProductSchema.findOne({ title: title })
        if (product && product._id.toString() !== req.params.id) {
            res.status(ALREADYEXISTS).send({
                status: false,
                message: responseMessages.DUPLICATE_ERROR
            })
        } else {
            const newupdateProduct = await ProductSchema.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            res.status(OK).send({
                status: true,
                message: responseMessages.PRODUCT_UPDATED,
                data: newupdateProduct
            })
        }
    } catch (error) {
        res.status(INTERNALERROR).send({
            status: false,
            message: responseMessages.ERROR_MESSAGES
        })
    }
}

//API: /api/product/:id
//Request: DELETE
//Access: Admin
// DELETE PRODUCT

export const deleteProduct = async (req, res) => {
    try {
        await ProductSchema.findByIdAndDelete(req.params.id)
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
//API: /api/product/find/:id
//Request: GET
//Access: All
// GET PRODUCT

export const getProduct = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id)
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: product
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}


//API: /api/product/?category
//Request: GET
//Access: All
// GET PRODUCT BY CATEGORY AND NEW

export const getAllProduct = async (req, res) => {
    try {
        const qNew = req.query.new
        const qCategory = req.query.category
        let products;
        if (qNew) {
            products = await ProductSchema.find().sort({ createdAt: -1 }).limit(1)
        } else if (qCategory) {
            products = await ProductSchema.find({ categories: { $in: [qCategory] } })
        }else{
            products = await ProductSchema.find()
        }
        res.status(OK).send({
            status: true,
            message: responseMessages.GET_SUCCESS_MESSAGES,
            data: products
        })
    } catch (error) {
        res.status(FORBIDDEN).send({
            status: false,
            message: responseMessages.GET_UNSUCCESS_MESSAGES
        })
    }
}


