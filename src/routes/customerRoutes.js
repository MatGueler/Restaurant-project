import { Router } from 'express';

const router = Router();

import customerController from '../controllers/customerController.js';
import validateCustomer from '../middlewares/validateCustomer.js';

router.post('/', validateCustomer, customerController.createCustomer);

export default router;
