import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { shippingAddress } from '../../features/cart/cartSlice'
import './ShippingAddressPage.css'

const ShippingAddressPage = () => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [street, setStreet] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = () => {
    dispatch(
      shippingAddress({ country, city, district, street, additionalInfo })
    )
    navigate('/placeorder')
  }

  return (
    <div className='orderContainer'>
      <p className='registerHeader'>Shipping Address Info</p>
      <div className='formContainer'>
        <p className='formLabels'>Country</p>

        <input
          type='text'
          value={country}
          onChange={(e) => {
            setCountry(e.target.value)
          }}
        />
        <p className='formLabels'>City</p>

        <input
          type='text'
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <p className='formLabels'>District</p>

        <input
          type='text'
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value)
          }}
        />
        <p className='formLabels'>Street</p>

        <input
          type='text'
          value={street}
          onChange={(e) => {
            setStreet(e.target.value)
          }}
        />

        <p className='formLabels'>Additional Info</p>

        <input
          type='text'
          value={additionalInfo}
          onChange={(e) => {
            setAdditionalInfo(e.target.value)
          }}
        />
        <button className='registerButton' onClick={submitHandler}>
          Next
        </button>
      </div>
    </div>
  )
}

export default ShippingAddressPage
