import menuService from '../services/menuService.js'

const createDisheToMenu = async (req, res) => {
  try {
    const dish = await menuService.createDisheToMenu(req.body)
    return res.status(201).json(dish)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Erro interno no servidor' })
  }
}

const getMenuDishes = async (req, res) => {
  try {
    const dishes = await menuService.getMenuDishes(req.query)
    return res.status(201).json(dishes)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Erro interno no servidor' })
  }
}

export default { createDisheToMenu, getMenuDishes }
