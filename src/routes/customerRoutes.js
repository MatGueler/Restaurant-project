import router from './router.js'

import customerController from '../controllers/customerController.js'
import validateCustomer from '../middlewares/validateCustomer.js'

router.post('/customers', validateCustomer, customerController.createCustomer)

export default router
