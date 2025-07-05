import orderController from '../controllers/orderController.js'
import validateOrder from '../middlewares/validateOrder.js'

import router from './router.js'

// order crud
router.post('/order', validateOrder, orderController.createOrder)
router.get(`/order/list`, orderController.getOrders)

// get customer orders
router.get('/customer/orders/:orderId', orderController.getCustomerOrders)

export default router
