import { jest } from '@jest/globals'
import customerValidation from '../../src/middlewares/validateCustomer.js'

describe('Customer Service - Middleware Validation', () => {
  let res, next

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      end: jest.fn(),
      locals: {},
      get: jest.fn(),
      set: jest.fn(),
      headersSent: false,
    }
    next = jest.fn()
    jest.clearAllMocks()
  })

  it('shows error for missing phone', async () => {
    const req = {
      body: {
        name: 'Mat',
        email: 'mat@email.com',
      },
    }

    await customerValidation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      error: 'All fields (name, email, phone) are required.',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('calls next function successfully after validation', async () => {
    const req = {
      body: {
        name: 'Mat',
        email: 'mat@email.com',
        phone: '1234567890',
      },
    }

    await customerValidation(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
