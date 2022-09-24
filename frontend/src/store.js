import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cart/cartSlice'
import orderSlice from './features/orders/orderSlice'
import productsSlice from './features/products/productsSlice'
import usersSlice from './features/users/usersSlice'
import adminSlice from './features/admin/adminSlice'

export default configureStore({
  reducer: {
    products: productsSlice,
    users: usersSlice,
    cart: cartSlice,
    order: orderSlice,
    admin: adminSlice,
  },
})
