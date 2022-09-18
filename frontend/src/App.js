import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProductsPage from './pages/Products/ProductsPage'
import ProductDetailsPage from './pages/Products/ProductDetailsPage'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Users/LoginPage'
import RegisterPage from './pages/Users/RegisterPage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/cart/:id' element={<CartPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
