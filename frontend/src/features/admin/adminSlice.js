import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  allOrders: [],
  loading: false,
}

export const getAllOrders = createAsyncThunk(
  'admin/getAllOrders',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.get(`/api/v1/order/allorders`, {
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

export const updateOrderAsDelivered = createAsyncThunk(
  'admin/updateOrderAsDelivered',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.get(
        `/api/v1/order/admin/updateorder/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.loading = true
    },
    [getAllOrders.fulfilled]: (state, { payload }) => {
      state.allOrders = payload
    },
    [getAllOrders.rejected]: (state) => {
      state.loading = false
    },

    [getAllOrders.pending]: (state) => {
      state.loading = true
    },
    [getAllOrders.fulfilled]: (state, { payload }) => {
      state.allOrders = payload
    },
    [getAllOrders.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default adminSlice.reducer
