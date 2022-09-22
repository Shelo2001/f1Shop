const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid')

const placeOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } =
    req.body

  const newOrder = new Order({
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  })

  try {
    const createdOrder = await newOrder.save()
    res.status(201).send(createdOrder)
  } catch (error) {
    console.log(error)
  }
})

const getOrderWithId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    'user',
    'name email phoneNumber'
  )

  try {
    if (order) {
      res.send(order)
    }
  } catch (error) {
    console.log(error)
  }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    console.log(error)
  }
})

module.exports = { placeOrder, getOrderWithId, updateOrderToPaid }
