import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { detailsUser } from '../../features/users/usersSlice'
import { getAllOrdersUser } from '../../features/orders/orderSlice'
import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const userDetails = useSelector((state) => state.users.userDetails)
  const user = useSelector((state) => state.users.user)

  const myOrders = useSelector((state) => state.order)
  const { allOrder } = myOrders
  console.log(allOrder)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    dispatch(detailsUser(params.id))
    dispatch(getAllOrdersUser())
    if (!user) {
      navigate('/')
    }
  }, [dispatch])

  const updateHandler = () => {
    const data = { name, email, phoneNumber, password }
    dispatch(detailsUser(data))
  }

  return (
    <div className='profileContainer'>
      <div className='profileDetails left'>
        <div>
          <p className='profileLabels'>Personal Information Update</p>
          <p className='formLabels'>Name</p>
          <input
            type='text'
            value={userDetails.name}
            placeholder='Akaki'
            onChange={(e) => setName(e.target.value)}
          />
          <p className='formLabels'>Email</p>

          <input
            type='email'
            value={userDetails.email}
            placeholder='email@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='formLabels'>Password</p>

          <input
            type='password'
            value={password}
            placeholder='................'
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className='formLabels'>Password</p>

          <input
            type='password'
            value={confirmPassword}
            placeholder='................'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <p className='formLabels'>Phone Number</p>

          <input
            type='text'
            value={userDetails.phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='555-222-333'
          />

          <button className='registerButton' onClick={() => updateHandler}>
            Update
          </button>
        </div>
      </div>
      <div className='profileDetails right'>
        <p className='profileLabels'>My Orders</p>

        <table class='customTable'>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Placed Time</th>
              <th>Delivered</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((order) => (
              <tr>
                <td>#{order._id}</td>
                <td>{order.createdAt}</td>
                <td>
                  {order.isDelivered ? (
                    <i class='fa-solid fa-check'></i>
                  ) : (
                    <i class='fa-solid fa-x'></i>
                  )}
                </td>
                <td>{order.totalPrice} $</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage
