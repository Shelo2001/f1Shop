import React, { useEffect } from 'react'
import SideNav from '../../components/SideNav'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteOrder,
  getAllOrders,
  updateOrderAsDelivered,
} from '../../features/admin/adminSlice'
import { Link, useNavigate } from 'react-router-dom'
import './OrderPage.css'

const OrdersPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orders = useSelector((state) => state.admin)
  const { allOrders } = orders

  const admin = useSelector((state) => state.users)
  const { user: userAdmin } = admin

  useEffect(() => {
    if (userAdmin.isAdmin) {
      dispatch(getAllOrders())
    } else {
      navigate('/')
    }
  }, [])

  const markAsDeliveredHandler = (id) => {
    dispatch(updateOrderAsDelivered(id))
    window.location.reload()
  }

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
    window.location.reload()
  }

  return (
    <div>
      <SideNav />
      <p className='adminLabel'>ORDERS</p>
      <table class='customTable' style={{ marginTop: '30px' }}>
        <thead>
          <tr>
            <th>Order N</th>
            <th>Placed Time</th>
            <th>Total Price</th>

            <th>Delivered</th>
            <th>Pay On Delivery</th>
            <th>Paid</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, i) => (
            <tr>
              <td>#{i + 1}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice} $</td>

              <td>
                {order.isDelivered ? (
                  <i class='fa-solid fa-check'></i>
                ) : (
                  <button
                    onClick={() => markAsDeliveredHandler(order._id)}
                    className='deliveredButton'
                  >
                    Mark As Delivered
                  </button>
                )}
              </td>
              <td>
                {order.payOnDelivery ? (
                  <i class='fa-solid fa-check'></i>
                ) : (
                  <i class='fa-solid fa-x'></i>
                )}
              </td>
              <td>
                {order.isPaid ? (
                  <i class='fa-solid fa-check'></i>
                ) : (
                  <i class='fa-solid fa-x'></i>
                )}
              </td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <button className='linkTd'>Details</button>
                </Link>
              </td>
              <td>
                <button
                  className='deleteButton'
                  onClick={() => deleteOrderHandler(order._id)}
                >
                  <i class='fa-solid fa-trash fa-lg'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage
