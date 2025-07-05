import errorHandlerResponse from '../utils/errorHandlerResponse.js'

export default (req, res, next) => {
  const { customer_id, items } = req.body

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
