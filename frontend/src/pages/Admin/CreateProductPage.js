import React, { useState } from 'react'
import { createProduct } from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateProductPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const productsData = useSelector((state) => state.admin)
  const { success } = productsData

  const createProductHandler = () => {
    const data = { name, price, category, countInStock, description, image }
    dispatch(createProduct(data))
    if (success) {
      navigate('/')
    }
  }

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type='number'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <input
        type='number'
        value={countInStock}
        onChange={(e) => setCountInStock(e.target.value)}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input value={image} onChange={(e) => setImage(e.target.value)} />
      <button onClick={createProductHandler} className='checkoutButton'>
        create product
      </button>
    </div>
  )
}

export default CreateProductPage
