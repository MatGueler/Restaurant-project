import { jest } from '@jest/globals'
import menuService from '../../src/services/menuService.js'
import menuRepository from '../../src/repository/menuRepository.js'
import { DISHES_CATEGORIES } from '../../src/constants/dishes.js'

const mockFn = {
  createDisheToMenu: jest.spyOn(menuRepository, 'createDisheToMenu'),
  getMenuDishes: jest.spyOn(menuRepository, 'getMenuDishes'),
}

describe('createDisheToMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create a dish and return the created dish object', async () => {
    const input = {
      name: 'Spaghetti',
      description: 'Classic Italian pasta',
      price: 18.5,
      category: 'Pasta',
    }

    const mockDish = {
      id: 2,
      ...input,
    }

    mockFn.createDisheToMenu.mockResolvedValue(mockDish)

    const result = await menuService.createDisheToMenu(input)

    expect(menuRepository.createDisheToMenu).toHaveBeenCalledWith(input)
    expect(result).toBe(mockDish)
  })

  it('should propagate errors from the repository', async () => {
    const input = {
      name: 'Risotto',
      description: 'Creamy rice dish',
      price: 22.0,
      category: 'Rice',
    }

    const error = new Error('Database error')
    mockFn.createDisheToMenu.mockRejectedValue(error)

    await expect(menuService.createDisheToMenu(input)).rejects.toThrow(
      'Database error'
    )
    expect(menuRepository.createDisheToMenu).toHaveBeenCalledWith(input)
  })
})

describe('getMenuDishes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the menu', async () => {
    const mockMenu = [
      { id: 1, name: 'Pizza', description: 'Cheese pizza', price: 15.0 },
      {
        id: 2,
        name: 'Pasta',
        description: 'Spaghetti with meatballs',
        price: 18.0,
      },
    ]

    mockFn.getMenuDishes.mockResolvedValue(mockMenu)

    const result = await menuService.getMenuDishes({
      category: DISHES_CATEGORIES[0],
      page: 1,
      limit: 10,
    })

    expect(mockFn.getMenuDishes).toHaveBeenCalled()
    expect(result).toBe(mockMenu)
  })

  it('should throw an error for invalid category', async () => {
    const invalidCategory = 'InvalidCategory'

    await expect(
      menuService.getMenuDishes({
        category: invalidCategory,
        page: 1,
        limit: 10,
      })
    ).rejects.toThrow(
      `Category must be one of: ${DISHES_CATEGORIES.join(', ')}`
    )

    expect(mockFn.getMenuDishes).not.toHaveBeenCalled()
  })

  it('should fix pagination when is 0', async () => {
    const mockMenu = [
      { id: 1, name: 'Pizza', description: 'Cheese pizza', price: 15.0 },
      {
        id: 2,
        name: 'Pasta',
        description: 'Spaghetti with meatballs',
        price: 18.0,
      },
    ]

    mockFn.getMenuDishes.mockResolvedValue(mockMenu)

    const result = await menuService.getMenuDishes({
      category: DISHES_CATEGORIES[0],
      page: 0,
      limit: 10,
    })

    expect(mockFn.getMenuDishes).toHaveBeenCalledWith({
      offset: 0,
      limit: 10,
      category: DISHES_CATEGORIES[0],
    })

    expect(result).toBe(mockMenu)
  })
})
