import { jest } from '@jest/globals'
import validateOrder from '../../src/middlewares/validateOrder.js'
import { ORDER_STATUS } from '../../src/constants/orderStatus.js'

describe('Order - Middleware Validation', () => {
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

  describe('createOrder', () => {
    it('should call badRequest if customer_id is missing', () => {
      const req = { body: { items: [{ menu_item_id: 1, quantity: 2 }] } }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required field: customer_id',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call badRequest if items are missing', () => {
      const req = { body: { customer_id: 1 } }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required field: items',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call badRequest if items is not an array', () => {
      const req = { body: { customer_id: 1, items: 'not an array' } }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required field: items',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call badRequest if items array is empty', () => {
      const req = { body: { customer_id: 1, items: [] } }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required field: items',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call badRequest if item is missing menu_item_id or quantity', () => {
      const req = { body: { customer_id: 1, items: [{ quantity: 2 }] } }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Each item must have menuItemId and quantity',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call badRequest if item quantity is not a positive number', () => {
      const req = {
        body: { customer_id: 1, items: [{ menu_item_id: 1, quantity: -2 }] },
      }
      validateOrder.createOrder(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Quantity must be a positive number',
      })

      expect(next).not.toHaveBeenCalled()
    })
  })

  describe('patchOrderStatus', () => {
    it('should call badRequest if status is not valid', () => {
      const req = { body: { status: 'invalid_status' } }
      validateOrder.patchOrderStatus(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: `Status must be one of: ${Object.keys(ORDER_STATUS).join(', ')}`,
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call next if status is valid', () => {
      const req = { body: { status: ORDER_STATUS.pending } }
      validateOrder.patchOrderStatus(req, res, next)

      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })

  describe('patchOrderItems', () => {
    it('should call badRequest if order_id is missing', () => {
      const req = { body: { items: [{ menu_item_id: 1, quantity: 2 }] } }
      validateOrder.patchOrderItems(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        error: 'Missing required field: order_id',
      })

      expect(next).not.toHaveBeenCalled()
    })

    it('should call next if order_id and items are valid', () => {
      const req = {
        params: { order_id: '123' },
        body: { items: [{ menu_item_id: 1, quantity: 2 }] },
      }
      validateOrder.patchOrderItems(req, res, next)

      expect(res.status).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()
      expect(next).toHaveBeenCalled()
    })
  })
})
