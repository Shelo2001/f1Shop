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

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
    countInStock: req.body.countInStock,
    size: 'M',
  })

  const createdProduct = await product.save()
  res.status(201).send(createdProduct)
})

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  res.send(product)
})
module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProductById,
}
