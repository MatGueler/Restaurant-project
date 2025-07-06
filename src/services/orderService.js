import orderRepository from '../repository/orderRepository.js'
import customerRepository from '../repository/customerRepository.js'
import menuRepository from '../repository/menuRepository.js'
import errorHandler from '../utils/errorHandler.js'
import { ORDER_STATUS } from '../constants/orderStatus.js'

const createOrder = async ({ customer_id, items }) => {
  const customerExists = await customerRepository.getCustomerById(customer_id)
  if (!customerExists) {
    throw errorHandler.notFound('Customer not found')
  }

  const menuItemIds = items.map((item) => item.menu_item_id)
  const menuItems = await menuRepository.getMenuItemsByIds(menuItemIds)

  if (menuItems.length !== items.length) {
    throw errorHandler.badRequest('Some menu items do not exist')
  }

  const orderTotalPrice = items.reduce((total, item) => {
    const orderItem = menuItems.find((i) => i.id === item.menu_item_id)
    return total + orderItem.price * item.quantity
  }, 0)

  if (orderTotalPrice <= 0) {
    throw errorHandler.badRequest('Order total price is invalid')
  }

  const order = await orderRepository.createOrder({
    customer_id,
    items,
    status: 'pending',
    total_price: orderTotalPrice,
  })

  const orderItemsData = items.map((item) => {
    const menuItem = menuItems.find((i) => i.id === item.menu_item_id)
    return {
      order_id: order.id,
      menu_item_id: menuItem.id,
      quantity: item.quantity,
      price_at_order: menuItem.price,
    }
  })

  await orderRepository.createOrderItems(orderItemsData)

  return order
}

export const getOrdersByCustomer = async ({
  customer_id,
  offset = 0,
  limit = 20,
}) => {
  const orders = await orderRepository.getOrdersByCustomer({
    customer_id,
    offset,
    limit,
  })

  return orders
}

const getOrders = async ({ category, ...query }) => {
  const orders = await orderRepository.getOrders({ category, ...query })
  return orders
}

const patchOrderStatus = async (order_id, { status }) => {
  const order = await orderRepository.getOrderById(order_id)
  if (!order) {
    throw errorHandler.notFound('Order not found')
  }

  await orderRepository.updateOrderStatus(order_id, {
    status,
  })
}

const modifyOrder = async (order_id, { items }) => {
  const orderExists = await orderRepository.getOrderById(order_id)
  if (!orderExists) {
    throw errorHandler.notFound('Order not found')
  }

  const isValidStatus =
    orderExists.status === ORDER_STATUS.pending ||
    orderExists.status === ORDER_STATUS.preparing

  if (!isValidStatus) {
    throw errorHandler.badRequest('Order cannot be modified at this stage')
  }

  const menuItemIds = items.map((item) => item.menu_item_id)
  const menuItems = await menuRepository.getMenuItemsByIds(menuItemIds)

  if (menuItems.length !== items.length) {
    throw errorHandler.badRequest('Some menu items do not exist')
  }

  const orderTotalPrice = items.reduce((total, item) => {
    const orderItem = menuItems.find((i) => i.id === item.menu_item_id)
    return total + orderItem.price * item.quantity
  }, 0)

  if (orderTotalPrice <= 0) {
    throw errorHandler.badRequest('Order total price is invalid')
  }

  const orderItemsData = items.map((item) => {
    const menuItem = menuItems.find((i) => i.id === item.menu_item_id)
    return {
      order_id: order_id,
      menu_item_id: menuItem.id,
      quantity: item.quantity,
      price_at_order: menuItem.price,
    }
  })

  await orderRepository.updateOrderWithItems(order_id, {
    items: orderItemsData,
    total_price: orderTotalPrice,
  })
}

export default {
  createOrder,
  getOrdersByCustomer,
  getOrders,
  patchOrderStatus,
  modifyOrder,
}
