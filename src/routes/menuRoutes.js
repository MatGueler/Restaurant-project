import menuController from '../controllers/menuController.js'
import validateMenuItem from '../middlewares/validateMenuItem.js'

import router from './router.js'

router.post('/menu', validateMenuItem, menuController.createDisheToMenu)
router.get(`/menu`, menuController.getMenuDishes)

export default router
