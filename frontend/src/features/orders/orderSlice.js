import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  success: false,
  order: {},
  allOrder: [],
  placedOrder: {},
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

export const getAllOrdersUser = createAsyncThunk(
  'orders/getAllOrdersUser',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.get('/api/v1/order/myorders', {
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

export const payOnDeliveryOrderUpdate = createAsyncThunk(
  'orders/payOnDeliveryOrderUpdate',
  async (orderId, { getState }) => {
    try {
      const token = getState().users.user.token
      console.log(token)

      const { data } = await axios.get(`/api/v1/order/updateorder/${orderId}`, {
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
    [getAllOrdersUser.pending]: (state) => {
      state.loading = true
    },
    [getAllOrdersUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.allOrder = payload
    },
    [getAllOrdersUser.rejected]: (state) => {
      state.loading = false
    },
    [payOnDeliveryOrderUpdate.pending]: (state) => {
      state.loading = true
    },
    [payOnDeliveryOrderUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false
    },
    [payOnDeliveryOrderUpdate.rejected]: (state, action) => {
      state.loading = false
    },
  },
})

export default ordersSlice.reducer
