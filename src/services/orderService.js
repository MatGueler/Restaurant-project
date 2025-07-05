import orderRepository from '../repository/orderRepository.js'
import customerRepository from '../repository/customerRepository.js'
import menuRepository from '../repository/menuRepository.js'
import errorHandler from '../utils/errorHandler.js'
import { dishesCategories } from '../constants/dishes.js'

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
  if (category && !dishesCategories.includes(category)) {
    throw errorHandler.badRequest(
      `Category must be one of: ${dishesCategories.join(', ')}`
    )
  }

  const orders = await orderRepository.getOrders({ category, ...query })
  return orders
}

export default {
  createOrder,
  getCustomerOrders,
  getOrders,
}
