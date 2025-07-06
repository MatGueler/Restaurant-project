import { jest } from '@jest/globals'
import orderService from '../../src/services/orderService.js'
import customerRepository from '../../src/repository/customerRepository.js'
import menuRepository from '../../src/repository/menuRepository.js'
import orderRepository from '../../src/repository/orderRepository.js'

const mockFn = {
  getCustomerById: jest.spyOn(customerRepository, 'getCustomerById'),
  getMenuItemsByIds: jest.spyOn(menuRepository, 'getMenuItemsByIds'),
  createOrder: jest.spyOn(orderRepository, 'createOrder'),
  createOrderItems: jest.spyOn(orderRepository, 'createOrderItems'),
  getOrderById: jest.spyOn(orderRepository, 'getOrderById'),
  getOrdersByCustomer: jest.spyOn(orderRepository, 'getOrdersByCustomer'),
  getOrders: jest.spyOn(orderRepository, 'getOrders'),
  updateOrderStatus: jest.spyOn(orderRepository, 'updateOrderStatus'),
  updateOrderWithItems: jest.spyOn(orderRepository, 'updateOrderWithItems'),
}

describe('orderService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      mockFn.getCustomerById.mockResolvedValue({ id: 1 })
      mockFn.getMenuItemsByIds.mockResolvedValue([
        { id: 10, price: 5 },
        { id: 11, price: 10 },
      ])
      mockFn.createOrder.mockResolvedValue({ id: 100 })
      mockFn.createOrderItems.mockResolvedValue()

      const order = await orderService.createOrder({
        customer_id: 1,
        items: [
          { menu_item_id: 10, quantity: 2 },
          { menu_item_id: 11, quantity: 1 },
        ],
      })

      expect(mockFn.createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          customer_id: 1,
          status: 'pending',
          total_price: 20,
        })
      )
      expect(mockFn.createOrderItems).toHaveBeenCalled()
      expect(order).toEqual({ id: 100 })
    })

    it('should throw if customer does not exist', async () => {
      customerRepository.getCustomerById.mockResolvedValue(null)
      await expect(
        orderService.createOrder({
          customer_id: 2,
          items: [{ menu_item_id: 10, quantity: 1 }],
        })
      ).rejects.toThrow('Customer not found')
    })

    it('should throw if menu item does not exist', async () => {
      customerRepository.getCustomerById.mockResolvedValue({ id: 1 })
      mockFn.getMenuItemsByIds.mockResolvedValue([{ id: 10, price: 5 }])
      await expect(
        orderService.createOrder({
          customer_id: 1,
          items: [
            { menu_item_id: 10, quantity: 1 },
            { menu_item_id: 11, quantity: 1 },
          ],
        })
      ).rejects.toThrow('Some menu items do not exist')
    })

    it('should throw if total price is invalid', async () => {
      customerRepository.getCustomerById.mockResolvedValue({ id: 1 })
      mockFn.getMenuItemsByIds.mockResolvedValue([{ id: 10, price: 0 }])
      await expect(
        orderService.createOrder({
          customer_id: 1,
          items: [{ menu_item_id: 10, quantity: 1 }],
        })
      ).rejects.toThrow('Order total price is invalid')
    })
  })

  describe('getOrdersByCustomer', () => {
    it('should return orders for a customer', async () => {
      const mockOrders = [
        {
          id: 1,
          status: 'pending',
          total_price: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
          items: [
            { menu_item_id: 10, quantity: 2, name: 'Pizza' },
            { menu_item_id: 11, quantity: 1, name: 'Burger' },
          ],
        },
      ]

      mockFn.getOrdersByCustomer.mockResolvedValue(mockOrders)

      const orders = await orderService.getOrdersByCustomer({
        customer_id: 1,
        offset: 0,
        limit: 10,
      })

      expect(orders).toEqual([
        {
          id: 1,
          status: 'pending',
          total_price: 20,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          items: expect.any(Array),
        },
      ])
    })
  })

  describe('getOrders', () => {
    it('should return paginated orders', async () => {
      const mockItems = [
        { menu_item_id: 20, quantity: 1, name: 'Pasta' },
        { menu_item_id: 21, quantity: 2, name: 'Salad' },
      ]

      const mockOrders = [
        {
          id: 1,
          status: 'completed',
          total_price: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
          items: mockItems,
        },
      ]

      mockFn.getOrders.mockResolvedValue(mockOrders)

      const orders = await orderService.getOrders({
        page: 1,
        limit: 10,
      })

      expect(orders).toEqual([
        {
          id: 1,
          status: 'completed',
          total_price: 30,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          items: mockItems,
        },
      ])
    })

    it
  })

  describe('patchOrderStatus', () => {
    it('should update order status successfully', async () => {
      mockFn.getOrderById.mockResolvedValue({ id: 1 })
      mockFn.getOrders.mockResolvedValue([{ id: 1, status: 'pending' }])
      mockFn.updateOrderStatus.mockResolvedValue()

      await orderService.patchOrderStatus(1, {
        status: 'completed',
      })

      expect(mockFn.updateOrderStatus).toHaveBeenCalledWith(1, {
        status: 'completed',
      })
    })

    it('should throw if order does not exist', async () => {
      mockFn.getOrderById.mockResolvedValue(null)
      await expect(
        orderService.patchOrderStatus(999, { status: 'completed' })
      ).rejects.toThrow('Order not found')
    })
  })

  describe('modifyOrder', () => {
    it('should modify an order successfully', async () => {
      const mockMenuItems = [
        { id: 10, price: 5 },
        { id: 11, price: 10 },
      ]
      mockFn.getOrderById.mockResolvedValue({ id: 1, status: 'pending' })
      mockFn.getMenuItemsByIds.mockResolvedValue(mockMenuItems)
      mockFn.updateOrderWithItems.mockResolvedValue()

      await orderService.modifyOrder(1, {
        items: [
          { menu_item_id: 10, quantity: 2 },
          { menu_item_id: 11, quantity: 1 },
        ],
      })

      expect(mockFn.getOrderById).toHaveBeenCalledWith(1)
      expect(mockFn.getMenuItemsByIds).toHaveBeenCalledWith(
        mockMenuItems.map((item) => item.id)
      )

      expect(mockFn.updateOrderWithItems).toHaveBeenCalledWith(1, {
        items: [
          { menu_item_id: 10, quantity: 2, price_at_order: 5, order_id: 1 },
          { menu_item_id: 11, quantity: 1, price_at_order: 10, order_id: 1 },
        ],
        total_price: 20,
      })
    })

    it('should throw if order does not exist', async () => {
      mockFn.getOrderById.mockResolvedValue(null)
      await expect(
        orderService.modifyOrder(999, {
          items: [{ menu_item_id: 10, quantity: 1 }],
        })
      ).rejects.toThrow('Order not found')
    })

    it('should throw if order status is not modifiable', async () => {
      mockFn.getOrderById.mockResolvedValue({ id: 1, status: 'completed' })
      await expect(
        orderService.modifyOrder(1, {
          items: [{ menu_item_id: 10, quantity: 1 }],
        })
      ).rejects.toThrow('Order cannot be modified at this stage')
    })

    it('should throw if some menu items do not exist', async () => {
      mockFn.getOrderById.mockResolvedValue({ id: 1, status: 'pending' })
      mockFn.getMenuItemsByIds.mockResolvedValue([{ id: 10, price: 5 }])
      await expect(
        orderService.modifyOrder(1, {
          items: [
            { menu_item_id: 10, quantity: 1 },
            { menu_item_id: 11, quantity: 1 },
          ],
        })
      ).rejects.toThrow('Some menu items do not exist')
    })

    it('should throw if order total price is invalid', async () => {
      mockFn.getOrderById.mockResolvedValue({ id: 1, status: 'pending' })
      mockFn.getMenuItemsByIds.mockResolvedValue([{ id: 10, price: 0 }])
      await expect(
        orderService.modifyOrder(1, {
          items: [{ menu_item_id: 10, quantity: 1 }],
        })
      ).rejects.toThrow('Order total price is invalid')
    })
  })
})
