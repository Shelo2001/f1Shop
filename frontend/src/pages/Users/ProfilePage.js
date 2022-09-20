import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { detailsUser } from '../../features/users/usersSlice'
import './ProfilePage.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userDetails = useSelector((state) => state.users.userDetails)
  const user = useSelector((state) => state.users.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    dispatch(detailsUser(params.id))
    if (!user) {
      navigate('/')
    }
  }, [dispatch])

  return (
    <div className='profileContainer'>
      <div className='profileDetails left'>
        <div>
          <p className='profileLabels'>Personal Information Update</p>
          <p className='formLabels'>Name</p>
          <input
            type='text'
            value={name}
            placeholder='Akaki'
            onChange={(e) => setName(e.target.value)}
          />
          <p className='formLabels'>Email</p>

          <input
            type='email'
            value={email}
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
          <p className='formLabels'>Phone Number</p>

          <input
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='555-222-333'
          />

          <button className='registerButton'>Update</button>
        </div>
      </div>
      <div className='profileDetails right'>
        <p className='profileLabels'>My Orders</p>

        <table class='customTable'>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
              <th>Header 4</th>
              <th>Header 5</th>
              <th>Header 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
              <td>Row 1, Cell 3</td>
              <td>Row 1, Cell 4</td>
              <td>Row 1, Cell 5</td>
              <td>Row 1, Cell 6</td>
            </tr>

            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
              <td>Row 2, Cell 4</td>
              <td>Row 2, Cell 5</td>
              <td>Row 2, Cell 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfilePage
