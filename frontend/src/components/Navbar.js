import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/users/usersSlice'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <div className='navbar'>
      <div>
        <Link to='/' className='navbarLogo'>
          <i class='fa-brands fa-shopify fa-2xl'></i> Store
        </Link>
      </div>
      {user ? (
        <div className='navbarItems'>
          <Link className='items' to='/cart'>
            <i class='fa-solid fa-cart-shopping'></i>
          </Link>
          <div class='dropdown'>
            <Link className='items info'>
              <i class='fa-solid fa-user'></i> {user.name}
            </Link>
            <div class='dropdown-content'>
              <Link to={`/profile/${user._id}`}>Profile</Link>
              <Link to='/myorders'>My Orders</Link>
            </div>
          </div>
          <Link className='items logout' to='/' onClick={logoutHandler}>
            <i class='fa-solid fa-right-from-bracket'></i> Log Out
          </Link>
        </div>
      ) : (
        <div className='navbarItems'>
          <Link className='items' to='/cart'>
            <i class='fa-solid fa-cart-shopping'></i>
          </Link>
          <Link className='items' to='/register'>
            <i class='fa-solid fa-user'></i> Register
          </Link>
          <Link className='items' to='/login'>
            <i class='fa-solid fa-right-from-bracket'></i> Sign In
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
