import orderService from '../services/orderService.js'

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body)
    return res.status(201).json(order)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

const getCustomerOrders = async (req, res) => {
  try {
    const { customer_id } = req.params
    const orders = await orderService.getOrdersByCustomer({
      customer_id,
      ...req.query,
    })
    return res.status(200).json(orders)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.query)
    return res.status(200).json(orders)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

const patchOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params
    const order = await orderService.patchOrderStatus(order_id, req.body)
    return res.status(200).json(order)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

const modifyOrder = async (req, res) => {
  try {
    const { order_id } = req.params
    const order = await orderService.modifyOrder(order_id, req.body)
    return res.status(200).json(order)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

export default {
  createOrder,
  getCustomerOrders,
  getOrders,
  patchOrderStatus,
  modifyOrder,
}
