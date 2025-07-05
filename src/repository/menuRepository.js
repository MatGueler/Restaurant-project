import db from '../models/index.js'

const createDisheToMenu = async (dish) => {
  const customer = await db.Customer.create(dish)

  return customer
}

export const getMenuDishes = async ({ offset = 0, limit = 1, category }) => {
  let where = {}

  if (category) where.category = category

  const { count, rows } = await db.MenuItem.findAndCountAll({
    where,
    offset,
    limit,
    order: [['id', 'ASC']],
  })

  return {
    data: rows,
    meta: {
      offset: Number(offset),
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    },
  }
}

export const getMenuItemsByIds = async (menuItemIds) => {
  const menuItems = await db.MenuItem.findAll({
    where: {
      id: menuItemIds, // Sequelize já entende que é um array = IN
    },
    order: [['id', 'ASC']],
  })

  return menuItems.map((item) => item.get({ plain: true }))
}

export const getMenuItemsByOrder = async (order_id) => {
  const order = await db.Order.findByPk(order_id, {
    include: {
      model: db.OrderItem,
      include: db.MenuItem, // traz o prato vinculado ao item
    },
  })

  return order?.get({ plain: true })
}

export default {
  createDisheToMenu,
  getMenuDishes,
  getMenuItemsByIds,
}
