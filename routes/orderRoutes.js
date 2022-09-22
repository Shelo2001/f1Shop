const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/authMiddleware')
const {
  placeOrder,
  getOrderWithId,
  updateOrderToPaid,
} = require('../controllers/orderController')

router.route('/').post(isAuthenticated, placeOrder)
router.route('/:orderId').get(isAuthenticated, getOrderWithId)
router.route('/:id/pay').post(isAuthenticated, updateOrderToPaid)

module.exports = router
