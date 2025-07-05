import db from '../models/index.js'

const createOrder = async (order) => {
  console.log('Creating order:', order)
  const createdOrder = await db.Order.create(order)

  return createdOrder
}

const getCustomerOrders = async ({ page = 1, limit = 10, customer_id }) => {
  const where = {}
  if (customer_id) where.customer_id = customer_id

  const pageNumber = page <= 0 ? 1 : page
  const offset = (pageNumber - 1) * limit

  const { count, rows } = await db.Order.findAndCountAll({
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

const getOrders = async ({ page = 1, limit = 10 }) => {
  const pageNumber = page <= 0 ? 1 : page
  const offset = (pageNumber - 1) * limit

  const { count, rows } = await db.Order.findAndCountAll({
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
  createOrder,
  getCustomerOrders,
  getOrders,
}
