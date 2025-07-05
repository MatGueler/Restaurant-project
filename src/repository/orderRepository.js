import db from '../models/index.js'

const createOrder = async (order) => {
  const createdOrder = await db.Order.create(order)

  return createdOrder
}

const getOrderById = async (order_id) => {
  const order = await db.Order.findOne({
    where: { id: order_id },
  })

  return order
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

const updateOrderStatus = async (order_id, { status }) => {
  await db.Order.update(
    { status },
    {
      where: { id: order_id },
    }
  )
}

const patchOrder = async (order_id, { items, total_price }) => {
  await db.Order.update(
    {
      items,
      total_price,
    },
    {
      where: { id: order_id },
      returning: true,
    }
  )
}

export default {
  createOrder,
  getOrderById,
  getCustomerOrders,
  getOrders,
  updateOrderStatus,
  patchOrder,
}
