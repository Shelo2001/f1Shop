const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).send('User Already Exists')
  }

  const user = await User.create({ name, email, password, phoneNumber })

  if (user) {
    res.status(201).send({
      name,
      email,
      password,
      phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).send('Invalid User Data')
  }
})

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).send('Invalid User Data')
  }
})

const getProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phoneNumber: user.phoneNumber,
    })
  } else {
    res.status(404).send('User Not Found')
  }
})

const updateProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.send(updatedUser)
  } else {
    res.status(400).send('User Not Found')
  }
})

const getAllUsersAdmin = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.send(users)
})

const updateUserAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.isAdmin = true

    const updatedUser = await user.save()

    res.send(updatedUser)
  } else {
    res.status(400).send('User Not Found')
  }
})

module.exports = {
  registerUser,
  authenticateUser,
  getProfileUser,
  updateProfileUser,
  getAllUsersAdmin,
  updateUserAsAdmin,
}
