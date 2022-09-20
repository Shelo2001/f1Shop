import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  cartItems: [],
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
  },
})

export default cartSlice.reducer
