import router from './router.js'

import customerController from '../controllers/customerController.js'
import validateCustomer from '../middlewares/validateCustomer.js'

router.post('/customer', validateCustomer, customerController.createCustomer)
router.get('/customer/list', customerController.getCustomers)

export default router
