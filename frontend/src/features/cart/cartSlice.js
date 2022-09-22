import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  cartItems: [],
  shippingAddress: {},
  loading: false,
}

export const addCartItems = createAsyncThunk(
  'carts/addCartItems',
  async ({ id, quantity }, { getState }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`)
      if (data) {
        localStorage.setItem(
          'cartItems',
          JSON.stringify(getState().cart.cartItems)
        )
      }
      return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      }
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteCartItems = createAsyncThunk(
  'carts/deleteCartItems',
  async (id, { getState }) => {
    return id
  }
)

export const shippingAddress = createAsyncThunk(
  'carts/shippingAddress',
  async (shippingAddressData) => {
    return shippingAddressData
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [addCartItems.pending]: (state, action) => {
      state.loading = true
    },
    [addCartItems.fulfilled]: (state, { payload }) => {
      state.loading = false
      const item = payload
      const existItem = state.cartItems.find((p) => p.name === item.name)
      const isEqual = state.cartItems.find((p) => p.quantity === item.quantity)

      if (!existItem) {
        state.cartItems = [...state.cartItems, payload]
      }

      if (existItem && !isEqual) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        )
      }
    },
    [addCartItems.rejected]: (state) => {
      state.loading = false
    },
    [deleteCartItems.pending]: (state) => {
      state.loading = true
    },
    [deleteCartItems.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== payload)
    },
    [deleteCartItems.rejected]: (state) => {
      state.loading = false
    },
    [shippingAddress.pending]: (state) => {
      state.loading = true
    },
    [shippingAddress.fulfilled]: (state, { payload }) => {
      state.shippingAddress = payload
    },
    [shippingAddress.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default cartSlice.reducer
