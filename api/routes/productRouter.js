import express from "express"
import { VerifyTokenAndAdmin, VerifyTokenAndAuthorization } from "../utils/token.js"
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct} from "../controller/productController.js"
import upload from "../utils/multer.js"


const productRouter = express.Router()
productRouter.post('/',VerifyTokenAndAdmin,upload.single('img'),createProduct)
// productRouter.post('/',VerifyTokenAndAdmin,createProduct)
productRouter.put('/:id',VerifyTokenAndAdmin,upload.single('img'),updateProduct)
productRouter.delete('/:id',VerifyTokenAndAdmin,deleteProduct)
productRouter.get('/find/:id',getProduct)
productRouter.get('/',getAllProduct)


export default productRouter