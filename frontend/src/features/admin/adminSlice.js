import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  allOrders: [],
  allUsers: [],
  createdOrder: {},
  loading: false,
  success: false,
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

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (product, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.post(`/api/v1/products`, product, {
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

export const deleteOrder = createAsyncThunk(
  'admin/deleteOrder',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.delete(`/api/v1/order/${id}`, {
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

export const deleteProductById = createAsyncThunk(
  'admin/deleteProductById',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.delete(`/api/v1/products/${id}`, {
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

export const getAllUsersList = createAsyncThunk(
  'admin/getAllUsersList',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token

      const { data } = await axios.get(`/api/v1/users/userlist`, {
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

    [updateOrderAsDelivered.pending]: (state) => {
      state.loading = true
    },
    [updateOrderAsDelivered.fulfilled]: (state, { payload }) => {
      state.allOrders = payload
    },
    [updateOrderAsDelivered.rejected]: (state) => {
      state.loading = false
    },

    [createProduct.pending]: (state) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.createOrder = payload
      state.success = true
      state.loading = false
    },
    [createProduct.rejected]: (state) => {
      state.loading = false
    },

    [createProduct.pending]: (state) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state) => {
      state.loading = false
    },
    [createProduct.rejected]: (state) => {
      state.loading = false
    },

    [deleteProductById.pending]: (state) => {
      state.loading = true
    },
    [deleteProductById.fulfilled]: (state) => {
      state.loading = false
    },
    [deleteProductById.rejected]: (state) => {
      state.loading = false
    },

    [getAllUsersList.pending]: (state) => {
      state.loading = true
    },
    [getAllUsersList.fulfilled]: (state, { payload }) => {
      state.allUsers = payload
      state.loading = false
    },
    [getAllUsersList.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default adminSlice.reducer
