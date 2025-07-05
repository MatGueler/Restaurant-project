import db from '../models/index.js'

const createDisheToMenu = async (dish) => {
  const customer = await db.Customer.create(dish)

  return customer
}

export const getMenuDishes = async ({ page = 1, limit = 1, category }) => {
  const where = {}
  if (category) where.category = category

  const pageNumber = page === 0 ? 1 : page

  const offset = (pageNumber - 1) * limit

  console.log('where', offset, limit, where)

  const { count, rows } = await db.MenuItem.findAndCountAll({
    where,
    offset,
    limit,
    order: [['id', 'ASC']],
  })

  return {
    data: rows,
    meta: {
      page: Number(pageNumber),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    },
  }
}

export default {
  createDisheToMenu,
  getMenuDishes,
}
