import orderRepository from '../repository/orderRepository.js'
import customerRepository from '../repository/customerRepository.js'
import menuRepository from '../repository/menuRepository.js'
import errorHandler from '../utils/errorHandler.js'
import { DISHES_CATEGORIES } from '../constants/dishes.js'
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

  return order
}

const getCustomerOrders = async ({ customer_id }) => {
  const orders = await orderRepository.getCustomerOrders(customer_id)

  return orders
}

const getOrders = async ({ category, ...query }) => {
  if (category && !DISHES_CATEGORIES.includes(category)) {
    throw errorHandler.badRequest(
      `Category must be one of: ${DISHES_CATEGORIES.join(', ')}`
    )
  }

  const orders = await orderRepository.getOrders({ category, ...query })
  return orders
}

const patchOrderStatus = async (order_id, { status }) => {
  const order = await orderRepository.getOrderById(order_id)
  if (!order) {
    throw errorHandler.notFound('Order not found')
  }

  const updatedOrder = await orderRepository.updateOrderStatus(order_id, {
    status,
  })

  return updatedOrder
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
    return errorHandlerResponse.badRequest({
      res,
      message: 'Order cannot be modified at this stage',
    })
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

  const order = await orderRepository.patchOrder(order_id, {
    items,
    total_price: orderTotalPrice,
  })

  return order
}

export default {
  createOrder,
  getCustomerOrders,
  getOrders,
  patchOrderStatus,
  modifyOrder,
}
