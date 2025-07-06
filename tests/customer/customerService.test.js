import { jest } from '@jest/globals'
import customerService from '../../src/services/customerService.js'
import customerRepository from '../../src/repository/customerRepository.js'

const mockFn = {
  getCustomerByEmail: jest.spyOn(customerRepository, 'getCustomerByEmail'),
  createCustomerFunction: jest.spyOn(customerRepository, 'createCustomer'),
  getCustomers: jest.spyOn(customerRepository, 'getCustomers'),
}

describe('Customer Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createCustomerService', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should create a customer when email does not exist', async () => {
      mockFn.getCustomerByEmail.mockResolvedValue(null)

      // input data for creating a customer
      const mockCreateCustomer = {
        name: 'John',
        email: 'john@mail.com',
        phone: '999-999-999',
      }

      // mock customer object that would be returned by the repository
      const mockCustomer = {
        id: 1,
        ...mockCreateCustomer,
        phone: '999999999',
      }

      mockFn.createCustomerFunction.mockResolvedValue(mockCustomer)

      const result =
        await customerService.createCustomerService(mockCreateCustomer)

      expect(customerRepository.getCustomerByEmail).toHaveBeenCalledWith({
        email: 'john@mail.com',
      })

      expect(mockFn.createCustomerFunction).toHaveBeenCalledWith({
        ...mockCreateCustomer,
        phone: '999999999',
      })
      expect(result).toBe(mockCustomer)
    })

    it('should throw an error when email already exists', async () => {
      const existingCustomer = {
        id: 1,
        name: 'Jane',
        email: 'jane@email.com',
        phone: '888-888-888',
      }
      mockFn.getCustomerByEmail.mockResolvedValue(existingCustomer)

      const mockCreateCustomer = {
        name: existingCustomer.name,
        email: existingCustomer.email,
        phone: existingCustomer.phone,
      }

      await expect(
        customerService.createCustomerService(mockCreateCustomer)
      ).rejects.toThrow('Customer with this email already exists')
    })
  })

  describe('getCustomers', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return a list of customers with pagination', async () => {
      const mockCustomers = [
        {
          id: 1,
          name: 'Alice',
          email: 'alice@gmail.com',
          phone: '123-456-789',
        },
        { id: 2, name: 'Bob', email: 'bob@gmail.com', phone: '987-654-321' },
      ]
      const page = 1
      const limit = 10
      const offset = (page - 1) * limit

      mockFn.getCustomers.mockResolvedValue(mockCustomers)
      const result = await customerService.getCustomers({ page, limit })

      expect(mockFn.getCustomers).toHaveBeenCalledWith({
        offset,
        limit,
      })
      expect(result).toEqual(mockCustomers)
    })

    it('should fix pagination when is 0', async () => {
      const mockCustomers = [
        {
          id: 1,
          name: 'Alice',
          email: 'alice@email.com',
          phone: '123-456-789',
        },
        { id: 2, name: 'Bob', email: 'bob@email.com', phone: '987-654-321' },
      ]

      const page = 0
      const limit = 10

      mockFn.getCustomers.mockResolvedValue(mockCustomers)

      await customerService.getCustomers({ page, limit })

      expect(mockFn.getCustomers).toHaveBeenCalledWith({
        offset: 0,
        limit,
      })
    })
  })
})
