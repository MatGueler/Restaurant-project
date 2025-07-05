import errorHandlerResponse from '../utils/errorHandlerResponse.js'
import { DISHES_CATEGORIES } from '../constants/dishes.js'

export default (req, res, next) => {
  const { name, description, price, category } = req.body

  if (!name || !description || price === undefined || !category) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Missing required fields: name, description, price, or category',
    })
  }

  const parsedPrice = Number(price)
  // The price must be greater than or equal to zero.
  if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
    return errorHandlerResponse.badRequest({
      res,
      message: 'Price must be a positive number',
    })
  }

  // Allowed categories: starter, main_course, dessert, drink.
  if (category && !DISHES_CATEGORIES.includes(category)) {
    return errorHandlerResponse.badRequest({
      res,
      message: `Category must be one of: ${DISHES_CATEGORIES.join(', ')}`,
    })
  }

  next()
}
