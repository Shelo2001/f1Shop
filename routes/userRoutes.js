const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middleware/authMiddleware')
const {
  registerUser,
  authenticateUser,
  getProfileUser,
  updateProfileUser,
} = require('../controllers/userController')

router.route('/register').post(registerUser)
router.route('/authentication').post(authenticateUser)
router
  .route('/profile')
  .get(isAuthenticated, getProfileUser)
  .put(isAuthenticated, updateProfileUser)

module.exports = router
