import React from 'react'
import './Slider.css'

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
    >
      {direction === 'next' ? (
        <i class='fa-solid fa-arrow-right fa-lg'></i>
      ) : (
        <i class='fa-solid fa-arrow-left fa-lg'></i>
      )}
    </button>
  )
}
