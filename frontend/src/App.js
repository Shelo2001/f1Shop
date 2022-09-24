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
import DashboardPage from './pages/Admin/DashboardPage'
import UsersPage from './pages/Admin/UsersPage'
import OrdersPage from './pages/Admin/OrdersPage'
import ServicesPage from './pages/Admin/ServicesPage'
import AdminProductsPage from './pages/Admin/AdminProductsPage'
import CreateProductPage from './pages/Admin/CreateProductPage'

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
        <Route path='/admin/dashboard' element={<DashboardPage />} />
        <Route path='/admin/products' element={<AdminProductsPage />} />
        <Route path='/admin/users' element={<UsersPage />} />
        <Route path='/admin/services' element={<ServicesPage />} />
        <Route path='/admin/orders' element={<OrdersPage />} />
        <Route path='/createproduct' element={<CreateProductPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
