import errorHandlerResponse from '../utils/errorHandlerResponse.js'
import { ORDER_STATUS } from '../constants/orderStatus.js'
import { DISHES_CATEGORIES } from '../constants/dishes.js'

export const createOrder = (req, res, next) => {
  const { customer_id = '', items = [] } = req.body || {}

  if (!customer_id) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Missing required field: customer_id',
    })
  }

  if (!items || !Array.isArray(items) || !items.length) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Missing required field: items',
    })
  }

  for (const item of items) {
    if (!item.menu_item_id || !item.quantity) {
      return errorHandlerResponse.badRequest({
        res,
        message: 'Each item must have menuItemId and quantity',
      })
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return errorHandlerResponse.badRequest({
        res,
        message: 'Quantity must be a positive number',
      })
    }
  }

  next()
}

export const patchOrderStatus = (req, res, next) => {
  const { status = '' } = req.body || {}

  if (!ORDER_STATUS[status]) {
    return errorHandlerResponse.badRequest({
      res,
      message: `Status must be one of: ${Object.keys(ORDER_STATUS).join(', ')}`,
    })
  }

  next()
}

export const patchOrderItems = (req, res, next) => {
  const { order_id = '' } = req.params || {}
  const { items = [] } = req.body || {}

  if (!order_id) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Missing required field: order_id',
    })
  }

  if (!items || !Array.isArray(items) || !items.length) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Missing required field: items',
    })
  }

  for (const item of items) {
    if (!item.menu_item_id || !item.quantity) {
      return errorHandlerResponse.badRequest({
        res,
        message: 'Each item must have menuItemId and quantity',
      })
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      return errorHandlerResponse.badRequest({
        res,
        message: 'Quantity must be a positive number',
      })
    }
  }

  next()
}

export const getOrders = (req, res, next) => {
  const { category = '' } = req.query || {}

  if (category && !DISHES_CATEGORIES.includes(category)) {
    return errorHandlerResponse.badRequest({
      res,
      message: `Category must be one of: ${DISHES_CATEGORIES.join(', ')}`,
    })
  }

  next()
}

export default {
  createOrder,
  patchOrderStatus,
  patchOrderItems,
  getOrders,
}
