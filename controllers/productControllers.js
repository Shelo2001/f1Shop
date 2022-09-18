const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.send(product)
})

module.exports = { getAllProducts, getSingleProduct }
