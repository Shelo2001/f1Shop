const express = require('express')
const router = express.Router()

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')
const {
  registerUser,
  authenticateUser,
  getProfileUser,
  updateProfileUser,
  getAllUsersAdmin,
  updateUserAsAdmin,
} = require('../controllers/userController')

router.route('/userlist').get(isAuthenticated, isAdmin, getAllUsersAdmin)
router.route('/register').post(registerUser)
router.route('/authentication').post(authenticateUser)
router.put('/profile', isAuthenticated, updateProfileUser)
router.get('/profile/:id', isAuthenticated, getProfileUser)
router.route('/admin/user/:id').get(isAuthenticated, isAdmin, updateUserAsAdmin)

module.exports = router
