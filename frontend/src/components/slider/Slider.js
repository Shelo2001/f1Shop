import React, { useEffect, useState } from 'react'
import './Slider.css'
import ButtonSlider from './ButtonSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAsync } from '../../features/products/productsSlice'
import { Link } from 'react-router-dom'

export default function Slider() {
  const dispatch = useDispatch()

  const productsState = useSelector((state) => state.products)
  const { products } = productsState

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  const [slideIndex, setSlideIndex] = useState(1)

  const nextSlide = () => {
    if (slideIndex !== products.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === products.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(products.length)
    }
  }

  return (
    <div className='container-slider'>
      {products.map((product, index) => {
        return (
          <div
            key={product._id}
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
          >
            <img src={product.image} />
          </div>
        )
      })}
      <ButtonSlider moveSlide={nextSlide} direction={'next'} />
      <ButtonSlider moveSlide={prevSlide} direction={'prev'} />
    </div>
  )
}
