const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
} = require('../controllers/productControllers')
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')

router.route('/').get(getAllProducts)
router.route('/').post(isAuthenticated, isAdmin, createProduct)
router.route('/:id').get(getSingleProduct)

module.exports = router
