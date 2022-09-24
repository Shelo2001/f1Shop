import React, { useEffect } from 'react'
import SideNav from '../../components/SideNav'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAsync } from '../../features/products/productsSlice'
import './AdminProductsPage.css'
import { Link } from 'react-router-dom'
const AdminProductsPage = () => {
  const dispatch = useDispatch()
  const productsData = useSelector((state) => state.products)
  const { products } = productsData

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  return (
    <div>
      <SideNav />
      <p className='adminLabel'>PRODUCTS </p>
      <table class='customTable' style={{ marginTop: '30px' }}>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>

            <th>In Stock</th>
            <th>Category</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price} $</td>

              <td>{product.countInStock}</td>
              <td>{product.category}</td>
              <td>
                <Link to={`/${product._id}`}>
                  <button className='linkTd'>Details</button>
                </Link>
              </td>
              <td>
                <button className='deleteButton'>
                  <i class='fa-solid fa-trash fa-lg'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to='/createproduct'>
        <button title='Add Product' className='addProductButton'>
          <i class='fa-solid fa-plus fa-lg'></i>
        </button>
      </Link>
    </div>
  )
}

export default AdminProductsPage
