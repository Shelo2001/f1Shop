import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import {
  getOrderWithId,
  payOnDeliveryOrderUpdate,
} from '../../features/orders/orderSlice'
import './OrderPage.css'

const OrderPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const stateOrder = useSelector((state) => state.order)
  const { placedOrder } = stateOrder
  const { orderItems, user, shippingAddress } = placedOrder

  useEffect(() => {
    dispatch(getOrderWithId(id))
  }, [dispatch, getOrderWithId])

  const orderUpdate = (orderId) => {
    dispatch(payOnDeliveryOrderUpdate(orderId))
    window.location.reload()
  }

  return (
    <div>
      <p className='header'>
        Order <i class='fa-solid fa-n'></i> {placedOrder._id}
      </p>
      <div>
        {orderItems ? (
          <div className='shoppingCartContainer'>
            <div className='shoppingCartProducts'>
              <p className='shoppingCartLabels'>Order Info</p>

              <div className='shippingAddressInfo'>
                <p>Name: {user.name}</p>
              </div>
              <div className='shippingAddressInfo'>
                <p>Email: {user.email}</p>
              </div>
              <div className='shippingAddressInfo'>
                <p>Phone Number: {user.phoneNumber}</p>
              </div>
              <div className='shippingAddressInfo'>
                <p>
                  Address: {shippingAddress.country}, {shippingAddress.city},{' '}
                  {shippingAddress.district}, {shippingAddress.street} (
                  {shippingAddress.additionalInfo})
                </p>
              </div>

              <div className='shippingAddressInfo'>
                {placedOrder.isDelivered ? (
                  <div className='success'>
                    <p>Delivery Status: Delivered</p>
                  </div>
                ) : (
                  <div className='warning'>
                    <p>Delivery Status: Not Delivered</p>
                  </div>
                )}
              </div>

              <div className='shippingAddressInfo'>
                {placedOrder.isPaid ? (
                  <div className='success'>
                    <p>Payment Status: Paid</p>
                  </div>
                ) : placedOrder.payOnDelivery ? (
                  <div className='success'>
                    <p>
                      Payment Status: Pay On Delivery, Our Courier Will Contact
                      You Within A Week
                    </p>
                  </div>
                ) : (
                  <div className='warning'>
                    <p>Payment Status: Not Paid</p>
                  </div>
                )}
              </div>

              <hr
                style={{
                  backgroundColor: 'black',
                  margin: '20px',
                  height: '2px',
                }}
              ></hr>
              <p className='shoppingCartLabels'>Ordered Products</p>
              <div>
                {orderItems.map((p) => (
                  <div>
                    <div className='productList'>
                      <div className='productDetailsList'>
                        <img
                          className='productDetailsListImage'
                          src={p.image}
                        />
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
                {orderItems
                  .reduce(
                    (acc, item) => acc + Number(item.quantity) * item.price,
                    0
                  )
                  .toFixed(2)}{' '}
                $
              </div>
              <div className='shoppingCartLabels'>
                Shipping Price:{' '}
                {orderItems
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
                {orderItems
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
              {!placedOrder.isPaid && (
                <button className='stripeButton'></button>
              )}
              <div className='shoppingCartLabels'>
                {!placedOrder.payOnDelivery && (
                  <button
                    className='checkoutButton'
                    onClick={() => orderUpdate(placedOrder._id)}
                  >
                    Pay On Delivery
                  </button>
                )}
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
    </div>
  )
}

export default OrderPage
