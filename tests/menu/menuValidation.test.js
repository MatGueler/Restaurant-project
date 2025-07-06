import { jest } from '@jest/globals'
import menuValidation from '../../src/middlewares/validateMenuItem.js'
import { DISHES_CATEGORIES } from '../../src/constants/dishes.js'

describe('Menu - Middleware Validation', () => {
  let res, next

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    next = jest.fn()
    jest.clearAllMocks()
  })

  it('shows error for missing name', async () => {
    const req = {
      body: {
        description: 'desc',
        price: 10,
        category: 'starter',
      },
    }

    menuValidation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Missing required fields: name, description, price, or category',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('shows error for negative price', async () => {
    const req = {
      body: {
        name: 'Dish',
        description: 'desc',
        price: -5,
        category: 'starter',
      },
    }

    menuValidation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Price must be a positive number',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('shows error for invalid type of price', async () => {
    const req = {
      body: {
        name: 'Dish',
        description: 'desc',
        price: 'abc',
        category: 'starter',
      },
    }

    menuValidation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Price must be a positive number',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('shows error for invalid category', async () => {
    const req = {
      body: {
        name: 'Dish',
        description: 'desc',
        price: 10,
        category: 'invalid_category',
      },
    }

    menuValidation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: `Category must be one of: ${DISHES_CATEGORIES.join(', ')}`,
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next for valid input', async () => {
    const req = {
      body: {
        name: 'Dish',
        description: 'desc',
        price: 10,
        category: DISHES_CATEGORIES[0],
      },
    }

    menuValidation(req, res, next)

    expect(next).toHaveBeenCalled()
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })
})
