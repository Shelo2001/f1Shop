const express = require('express')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')
const {
  placeOrder,
  getOrderWithId,
  updatePayOnDeliveryOrder,
  payOrder,
  getOrdersUser,
  getOrdersAdmin,
  updateOrderAsDeliveredAdmin,
  deleteOrdersAdmin,
} = require('../controllers/orderController')

router.route('/').post(isAuthenticated, placeOrder)
router.route('/myorders').get(isAuthenticated, getOrdersUser)
router.route('/allorders').get(isAuthenticated, isAdmin, getOrdersAdmin)
router
  .route('/admin/updateorder/:orderId')
  .get(isAuthenticated, isAdmin, updateOrderAsDeliveredAdmin)

router
  .route('/:orderId')
  .get(isAuthenticated, getOrderWithId)
  .delete(isAuthenticated, isAdmin, deleteOrdersAdmin)
router
  .route('/updateorder/:orderId')
  .get(isAuthenticated, updatePayOnDeliveryOrder)

module.exports = router
