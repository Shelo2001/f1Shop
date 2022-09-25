import React, { useEffect } from 'react'
import SideNav from '../../components/SideNav'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersList } from '../../features/admin/adminSlice'
import { Link, useNavigate } from 'react-router-dom'

const UsersPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const admin = useSelector((state) => state.users)
  const { user: userAdmin } = admin

  const users = useSelector((state) => state.admin)
  const { allUsers } = users

  useEffect(() => {
    if (userAdmin.isAdmin) {
      dispatch(getAllUsersList())
    } else {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <SideNav />
      <p className='adminLabel'>USERS</p>
      <table class='customTable' style={{ marginTop: '30px' }}>
        <thead>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr>
              <td>#{user._id}</td>
              <td>{user.name}</td>

              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {user.isAdmin ? (
                  <i class='fa-solid fa-check'></i>
                ) : (
                  <button className='deliveredButton'>Make As Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
