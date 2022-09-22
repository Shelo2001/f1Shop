import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProductsPage from './pages/Products/ProductsPage'
import ProductDetailsPage from './pages/Products/ProductDetailsPage'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Users/LoginPage'
import RegisterPage from './pages/Users/RegisterPage'
import ProfilePage from './pages/Users/ProfilePage'
import ShippingAddressPage from './pages/Order/ShippingAddressPage'
import PlaceOrderPage from './pages/Order/PlaceOrderPage'
import OrderPage from './pages/Order/OrderPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/cart/:id' element={<CartPage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/shippingaddress' element={<ShippingAddressPage />} />
        <Route path='/placeorder' element={<PlaceOrderPage />} />
        <Route path='/order/:id' element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
