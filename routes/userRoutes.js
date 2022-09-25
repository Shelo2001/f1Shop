const express = require('express')
const router = express.Router()

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')
const {
  registerUser,
  authenticateUser,
  getProfileUser,
  updateProfileUser,
  getAllUsersAdmin,
} = require('../controllers/userController')

router.route('/userlist').get(isAuthenticated, isAdmin, getAllUsersAdmin)
router.route('/register').post(registerUser)
router.route('/authentication').post(authenticateUser)
router.put('/profile', isAuthenticated, updateProfileUser)
router.get('/profile/:id', isAuthenticated, getProfileUser)

module.exports = router
