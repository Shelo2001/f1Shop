import React from 'react'
import { Link } from 'react-router-dom'
import './SideNav.css'

const SideNav = () => {
  return (
    <div>
      <div className='sideNav'>
        <div className='sideNavItems'>
          <Link to='/admin/users' className='sideNavListItems'>
            Users
          </Link>
          <Link to='/admin/orders' className='sideNavListItems'>
            Orders
          </Link>
          <Link to='/admin/products' className='sideNavListItems'>
            Products
          </Link>
          <Link to='/admin/services' className='sideNavListItems'>
            Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideNav
