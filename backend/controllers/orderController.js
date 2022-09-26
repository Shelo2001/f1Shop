const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')

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

const updatePayOnDeliveryOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId)

  console.log(order)

  if (order) {
    order.payOnDelivery = true
    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  } else {
    res.status(404).send('error')
  }
})

const getOrdersUser = asyncHandler(async (req, res) => {
  console.log(req.user._id)
  const orders = await Order.find({ user: req.user._id })
  res.send(orders)
})

const getOrdersAdmin = asyncHandler(async (req, res) => {
  const adminAllOrders = await Order.find({})
  res.send(adminAllOrders)
})

const deleteOrdersAdmin = asyncHandler(async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.orderId)
  res.send(deletedOrder)
})

const updateOrderAsDeliveredAdmin = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId)

  if (order) {
    order.isDelivered = true
    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  } else {
    res.status(404).send('error')
  }
})

module.exports = {
  placeOrder,
  getOrderWithId,
  updatePayOnDeliveryOrder,
  getOrdersUser,
  getOrdersAdmin,
  updateOrderAsDeliveredAdmin,
  deleteOrdersAdmin,
}
