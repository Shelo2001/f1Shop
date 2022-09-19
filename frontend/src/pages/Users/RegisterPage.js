import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../features/users/usersSlice'
import './RegisterPage.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const user = { name, email, password, phoneNumber }

  const {
    user: userInfo,
    loading,
    success,
  } = useSelector((state) => state.users)
  console.log(userInfo)

  const submitHandler = () => {
    dispatch(registerUser(user))
    toast.success('Successfully Registered!')
  }

  return (
    <div>
      {success && (
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <div className='registerForm'>
        <p className='registerHeader'>Sign Up</p>
        <div className='formContainer'>
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

          <button className='registerButton' onClick={submitHandler}>
            Sign Up
          </button>
          <hr className='line' />
          <p className='choice'>
            Already Have an Account?
            <Link to='/login'>
              <strong> Sign In</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
