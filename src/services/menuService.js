import menuRepository from '../repository/menuRepository.js'
import errorHandler from '../utils/errorHandler.js'
import { dishesCategories } from '../constants/dishes.js'

const createDisheToMenu = async ({ name, description, price, category }) => {
  const dish = await menuRepository.createDisheToMenu({
    name,
    description,
    price,
    category,
  })
  return dish
}

const getMenuDishes = async ({ category, page, limit }) => {
  if (category && !dishesCategories.includes(category)) {
    throw errorHandler.badRequest(
      `Category must be one of: ${dishesCategories.join(', ')}`
    )
  }

  const pageNumber = Number(page === 0 ? 1 : page)

  const offset = (pageNumber - 1) * limit

  const dishes = await menuRepository.getMenuDishes({ offset, limit, category })
  return dishes
}

export default {
  createDisheToMenu,
  getMenuDishes,
}
