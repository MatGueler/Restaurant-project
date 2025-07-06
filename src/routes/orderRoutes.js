import orderController from '../controllers/orderController.js'
import validateOrder from '../middlewares/validateOrder.js'

import router from './router.js'

// order crud
router.post('/order', validateOrder.createOrder, orderController.createOrder)
router.get(`/order/list`, orderController.getOrders)

// patch order status
router.patch(
  '/order/:order_id',
  validateOrder.patchOrderStatus,
  orderController.patchOrderStatus
)

// patch order items
router.patch(
  '/order/modify/:order_id',
  validateOrder.patchOrderItems,
  orderController.modifyOrder
)

// get customer orders
router.get(
  '/customer/orders/:customer_id',
  validateOrder.getOrders,
  orderController.getCustomerOrders
)

export default router
