import menuController from '../controllers/menuController.js'
import validateMenuItem from '../middlewares/validateMenuItem.js'

import { Router } from 'express'

const router = Router()

router.post('/menu', validateMenuItem, menuController.createDisheToMenu)
router.get(`/menu`, menuController.getMenuDishes)

export default router
