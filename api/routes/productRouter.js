import express from "express"
import { VerifyTokenAndAdmin, VerifyTokenAndAuthorization } from "../utils/token.js"
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct} from "../controller/productController.js"


const productRouter = express.Router()

productRouter.post('/',VerifyTokenAndAdmin,createProduct)
productRouter.put('/:id',VerifyTokenAndAdmin,updateProduct)
productRouter.delete('/:id',VerifyTokenAndAdmin,deleteProduct)
productRouter.get('/find/:id',getProduct)
productRouter.get('/',getAllProduct)


export default productRouter