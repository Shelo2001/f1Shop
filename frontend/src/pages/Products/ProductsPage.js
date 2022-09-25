import React, { useEffect } from 'react'
import './ProductsPage.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAsync } from '../../features/products/productsSlice'
import { Link } from 'react-router-dom'
import Slider from '../../components/slider/Slider'

const ProductsPage = () => {
  const { products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsAsync())
  }, [dispatch])

  return (
    <div>
      <p className='adminLabel'>Last Products</p>
      <Slider />
      <div className='aboutInfoProducts'>
        <p>
          A website that allows people to buy and sell physical goods, services,
        </p>
        <p>
          and digital products over the internet rather than at a
          brick-and-mortar location
        </p>
      </div>
      <div>
        <div class='dropdown' style={{ marginTop: '30px', marginLeft: '30px' }}>
          <Link className='items info'>
            <i class='fa-solid fa-grip-vertical'></i> Sort By
          </Link>
          <div class='dropdown-content'>
            <p>$ Ascending</p>
            <p>$ Descending</p>
          </div>
        </div>
      </div>

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
