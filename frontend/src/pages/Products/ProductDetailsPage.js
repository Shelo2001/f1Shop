import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProductAsync } from '../../features/products/productsSlice'
import './ProductDetailsPage.css'

const ProductDetailsPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()
  const product = useSelector((state) => state.products.product)

  useEffect(() => {
    dispatch(getSingleProductAsync(id))
  }, [dispatch])

  const navigateHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`)
  }
  return (
    <>
      <div className='productContainer'>
        <div className='productDetails'>
          <img
            src={product.image}
            alt={product.name}
            className='productDetailsImage'
          />
        </div>
        <div className='productDetails'>
          <p className='productName'>{product.name}</p>
          <p className='productDescription'>
            Description: {product.description}
          </p>
          <p className='productDescription'>Category: {product.category}</p>
          {product.countInStock > 0 ? (
            <p className='productDescription'>
              In Stock: {product.countInStock} Items
            </p>
          ) : (
            <p className='productDescription'>In Stock: No Items In Stock</p>
          )}
          <p className='productDescription'>Price: {product.price} $</p>
          {product.countInStock ? (
            <p className='productDescription'>
              Select Quantity:{' '}
              <select
                className='productQuantitySelect'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option defaultValue={x}>{x + 1}</option>
                ))}
              </select>
            </p>
          ) : (
            <div></div>
          )}
          {product.countInStock === 0 ? (
            <button className='disabledButton' disabled>
              Not In Stock
            </button>
          ) : (
            <button className='checkoutButton' onClick={navigateHandler}>
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage
