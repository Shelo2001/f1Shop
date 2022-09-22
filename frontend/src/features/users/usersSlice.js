import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('userInfo'))

const initialState = {
  user: user ? user : null,
  userDetails: {},
  loading: false,
  success: false,
}
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, email, password, phoneNumber }) => {
    try {
      const data = await axios.post(
        '/api/v1/users/register',
        { name, email, password, phoneNumber },
        config
      )
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        '/api/v1/users/authentication',
        { email, password },
        config
      )

      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
      }

      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const logoutUser = createAsyncThunk('users/logoutUser', async () => {
  try {
    localStorage.removeItem('userInfo')
  } catch (error) {
    console.log(error)
  }
})

export const detailsUser = createAsyncThunk(
  'users/detailsUser',
  async (id, { getState }) => {
    try {
      const token = getState().users.user.token
      const { data } = await axios.get(`/api/v1/users/profile/${id}`, {
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

export const registerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false
      state.success = 'Successfully Registered!'
    },
    [registerUser.rejected]: (state) => {
      state.loading = false
    },
    [loginUser.pending]: (state) => {
      state.loading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.user = payload
    },
    [loginUser.rejected]: (state) => {
      state.loading = false
    },
    [detailsUser.pending]: (state) => {
      state.loading = true
    },
    [detailsUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userDetails = payload
    },
    [detailsUser.rejected]: (state) => {
      state.loading = false
    },

    [logoutUser.fulfilled]: (state) => {
      state.user = null
    },
  },
})

export default registerSlice.reducer
