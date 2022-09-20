import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CartPage.css'
import { addCartItems } from '../../features/cart/cartSlice'
import { Link, useLocation, useParams } from 'react-router-dom'

const CartPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { id } = useParams()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const product = useSelector((state) => state.cart)
  const { cartItems } = product

  useEffect(() => {
    if (id) {
      dispatch(addCartItems({ id, quantity }))
    }
  }, [id, quantity, addCartItems, dispatch])

  return (
    <div>
      {cartItems.length !== 0 ? (
        <div className='shoppingCartContainer'>
          <div className='shoppingCartProducts'>
            <p className='shoppingCartLabels'>Shopping Cart Products</p>
            <div>
              {cartItems.map((p) => (
                <div>
                  <div className='productList'>
                    <div className='productDetailsList'>
                      <img className='productDetailsListImage' src={p.image} />
                    </div>
                    <div className='productDetailsList'>{p.name}</div>
                    <div className='productDetailsList'>{p.price} $</div>
                    <div className='productDetailsList'>
                      <select
                        value={p.quantity}
                        onChange={(e) =>
                          dispatch(
                            addCartItems({
                              id: p.product,
                              quantity: e.target.value,
                            })
                          )
                        }
                      >
                        {[...Array(p.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='productDetailsList'>
                      <i class='fa-solid fa-trash'></i>
                    </div>
                  </div>
                  <hr className='productDetailsListLine'></hr>
                </div>
              ))}
            </div>
          </div>
          <div className='shoppingCartPrices'>
            <p className='shoppingCartLabels'>Price</p>
            <div className='shoppingCartLabels'>Total Price:</div>
            <div className='shoppingCartLabels'>Shipping Price:</div>
            <div className='shoppingCartLabels'>
              <button>checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ minHeight: '80vh' }}>
          No Items In Cart Yet.
          <Link to='/'>
            <strong> Go Back To Shopping</strong>
          </Link>
        </p>
      )}
    </div>
  )
}

export default CartPage
