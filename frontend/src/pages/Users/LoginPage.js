import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/users/usersSlice'
import './RegisterPage.css'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = { email, password }

  const { user: userInfo, success } = useSelector((state) => state.users)

  const submitHandler = () => {
    dispatch(loginUser(user))
    navigate('/')
  }

  return (
    <div>
      <div className='registerForm'>
        <p className='registerHeader'>Sign In</p>
        <div className='loginFormContainer'>
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

          <button className='registerButton' onClick={submitHandler}>
            Sign In
          </button>
          <hr className='line' />
          <p className='choice'>
            Don't Have an Account?
            <Link to='/register'>
              <strong> Sign Up</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
