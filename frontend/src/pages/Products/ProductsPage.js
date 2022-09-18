import React, { useEffect } from 'react'
import './ProductsPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAsync } from '../../features/products/productsSlice'
import { Link } from 'react-router-dom'
const ProductsPage = () => {
  const { products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsAsync())
  }, [dispatch])

  return (
    <div>
      <div className='cardContainer'>
        {products.map((product) => (
          <Link to={`/${product._id}`}>
            <div className='card'>
              <img src={product.image} className='cardImage'></img>
              <div className='cardDetails'>
                <div className='cardTitle'>{product.name}</div>
                <div className='cardCategory'>({product.category})</div>
                <div>{product.price} $</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
