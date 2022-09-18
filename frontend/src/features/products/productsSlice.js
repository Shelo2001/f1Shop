import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const productsSlide = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload
    },
    getSingleProduct: (state, action) => {
      state.product = action.payload
    },
  },
})

export const getProductsAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/products`)
    dispatch(getProducts(response.data))
  } catch (err) {
    throw new Error(err)
  }
}

export const getSingleProductAsync = (id) => async (dispatch) => {
  try {
    const data = await axios.get(`/api/v1/products/${id}`)
    dispatch(getSingleProduct(data.data))
  } catch (err) {
    throw new Error(err)
  }
}

export const { getProducts, getSingleProduct } = productsSlide.actions
export default productsSlide.reducer
