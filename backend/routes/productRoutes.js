const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProductById,
} = require('../controllers/productControllers')
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')

router.route('/').get(getAllProducts)
router.route('/').post(isAuthenticated, isAdmin, createProduct)
router
  .route('/:id')
  .get(getSingleProduct)
  .delete(isAuthenticated, isAdmin, deleteProductById)

module.exports = router
