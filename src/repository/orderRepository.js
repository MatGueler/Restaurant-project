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

const createOrderItems = async (orderItems) => {
  const createdOrderItems = await db.OrderItem.bulkCreate(orderItems)

  return createdOrderItems
}

const getOrdersByCustomer = async ({ customer_id, offset = 0, limit = 10 }) => {
  // returns all orders for a specific customer with pagination
  const orders = await db.Order.findAll({
    where: { customer_id },
    offset,
    limit,
    order: [['id', 'ASC']],
    include: {
      model: db.OrderItem,
      include: db.MenuItem,
    },
  })

  // formatting the orders to return only necessary fields
  return orders.map((order) => {
    const { id, status, total_price, createdAt, updatedAt, OrderItems } =
      // convert Sequelize instance to plain object and extract fields
      order.get({ plain: true })

    const items = OrderItems.map((oi) => ({
      menu_item_id: oi.menu_item_id,
      quantity: oi.quantity,
      name: oi.MenuItem?.name || '',
    }))

    return {
      id,
      status,
      total_price,
      createdAt,
      updatedAt,
      items,
    }
  })
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

const patchOrder = async (order_id, { items, total_price }, t) => {
  await db.Order.update(
    {
      items,
      total_price,
    },
    {
      where: { id: order_id },
      transaction: t,
    }
  )
}

const updateOrderWithItems = async (order_id, { items, total_price }) => {
  return db.sequelize.transaction(async (t) => {
    // (good for small updates)
    await patchOrder(order_id, { items, total_price }, t)

    // Delete existing order items
    await db.OrderItem.destroy({ where: { order_id }, transaction: t })

    // Create new order items
    await db.OrderItem.bulkCreate(items, { transaction: t })
  })
}

export default {
  createOrder,
  getOrderById,
  createOrderItems,
  getOrdersByCustomer,
  getOrders,
  updateOrderStatus,
  patchOrder,
  updateOrderWithItems,
}
