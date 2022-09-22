import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  success: false,
  order: {},
  placedOrder: {},
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.post('/api/v1/order', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const getOrderWithId = createAsyncThunk(
  'orders/getOrderWithId',
  async (orderId, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.get(`/api/v1/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.order = payload
      state.success = true
    },
    [createOrder.rejected]: (state) => {
      state.loading = false
    },

    [getOrderWithId.pending]: (state) => {
      state.loading = true
    },
    [getOrderWithId.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.placedOrder = payload
    },
    [getOrderWithId.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default ordersSlice.reducer
