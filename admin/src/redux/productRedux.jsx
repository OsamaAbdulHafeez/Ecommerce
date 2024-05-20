import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // Get ALL
        getProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.product = action.payload
        },
        getProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Delete Product
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false
            state.product.splice(
                state.product.findIndex((item) => item._id === action.payload), 1
            )
        },
        deleteProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },

        // Update Product
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false
            console.log(action.payload)
            state.product[state.product.findIndex((item) => item._id === action.payload._id)] = action.payload
        },
        updateProductFailure: (state,action) => {
            state.isFetching = false
            state.error = action.payload
        },
        // ADD
        addProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false
            state.product.push(action.payload)
        },
        addProductFailure: (state,action) => {
            state.isFetching = false
            state.error = action.payload
        },
    }
})

export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} = productSlice.actions
export default productSlice.reducer