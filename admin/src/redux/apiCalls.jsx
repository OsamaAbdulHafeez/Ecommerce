import { publicRequest, userRequest } from "../requestMethods"
import {
    addProductFailure,
    addProductStart,
    addProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart,
    getProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess
} from "./productRedux"
import {
    loginFailure,
    loginStart,
    loginSuccess
} from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get('/product/')
        dispatch(getProductSuccess(res.data.data))
    } catch (error) {
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart())
    try {
        // const res = await userRequest.delete(`/product/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    try {
        const res = await userRequest.put(`/product/${id}`,product)
        console.log(product)
        console.log(res.data.data)
        dispatch(updateProductSuccess(res.data.data))
    } catch (error) {
        dispatch(updateProductFailure(error))
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    console.log(product)
    try {
        const res = await userRequest.post(`/product`, product)
        dispatch(addProductSuccess(res.data.data))
    } catch (error) {
        console.log(error)
        dispatch(addProductFailure(error))
    }
}