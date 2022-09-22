import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createOrder } from '../../features/orders/orderSlice'
import './PlaceOrderPage.css'

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const product = useSelector((state) => state.cart)
  const { cartItems } = product

  const shipping = useSelector((state) => state.cart)
  const { shippingAddress } = shipping

  const orderItem = useSelector((state) => state.order)
  const { success, order } = orderItem

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * Number(item.quantity), 0)
  )
  const shippingPrice = cartItems
    .reduce(
      (acc, item) => acc + (Number(item.quantity) * item.price * 5) / 100,
      0
    )
    .toFixed(2)
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2)

  const data = {
    orderItems: cartItems,
    shippingAddress,
    shippingPrice,
    itemsPrice,
    totalPrice,
  }

  const placeOrderHandler = () => {
    dispatch(createOrder(data))
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [order, success])

  return (
    <div>
      {cartItems.length !== 0 ? (
        <div className='shoppingCartContainer'>
          <div className='shoppingCartProducts'>
            <p className='shoppingCartLabels'>Shipping Address Info</p>
            <div className='shippingAddressInfo'>
              <p>
                Address: {shippingAddress.country}, {shippingAddress.city},{' '}
                {shippingAddress.district}, {shippingAddress.street} (
                {shippingAddress.additionalInfo})
              </p>
            </div>
            <hr
              style={{
                backgroundColor: 'black',
                margin: '20px',
                height: '2px',
              }}
            ></hr>
            <p className='shoppingCartLabels'>Order Products</p>
            <div>
              {cartItems.map((p) => (
                <div>
                  <div className='productList'>
                    <div className='productDetailsList'>
                      <img className='productDetailsListImage' src={p.image} />
                    </div>
                    <div className='productDetailsList'>
                      <Link to={`/${p.product}`}>{p.name}</Link>
                    </div>
                    <div className='productDetailsList'>
                      {p.quantity} x {p.price} = {p.quantity * p.price} $
                    </div>
                    <div className='productDetailsList'></div>
                  </div>
                  <hr className='productDetailsListLine'></hr>
                </div>
              ))}
            </div>
          </div>
          <div className='shoppingCartPrices'>
            <p className='shoppingCartLabels'>Order Summary</p>
            <hr></hr>
            <div className='shoppingCartLabels'>
              All Products Price :{' '}
              {cartItems
                .reduce(
                  (acc, item) => acc + Number(item.quantity) * item.price,
                  0
                )
                .toFixed(2)}{' '}
              $
            </div>
            <div className='shoppingCartLabels'>
              Shipping Price:{' '}
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + (Number(item.quantity) * item.price * 5) / 100,
                  0
                )
                .toFixed(2)}{' '}
              $
            </div>
            <hr></hr>
            <div className='shoppingCartLabels'>
              total Price:{' '}
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc +
                    Number(item.quantity) * item.price +
                    (Number(item.quantity) * item.price * 5) / 100,
                  0
                )
                .toFixed(2)}{' '}
              $
            </div>
            <div className='shoppingCartLabels'>
              <button
                className='checkoutCartButton'
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
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

export default PlaceOrder
