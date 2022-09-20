import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cartSlice'
import productsSlice from './features/products/productsSlice'
import usersSlice from './features/users/usersSlice'

export default configureStore({
  reducer: {
    products: productsSlice,
    users: usersSlice,
    cart: cartSlice,
  },
})
