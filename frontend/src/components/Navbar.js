import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div>
        <Link to='/' className='navbarLogo'>
          <i class='fa-brands fa-shopify fa-2xl'></i> Store
        </Link>
      </div>
      <div className='navbarItems'>
        <Link className='items' to='/cart'>
          <i class='fa-solid fa-cart-shopping'></i>
        </Link>
        <Link className='items' to='/register'>
          Register
        </Link>
        <Link className='items' to='/login'>
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Navbar
