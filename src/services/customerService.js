import customerRepository from '../repository/customerRepository.js'
import errorHandler from '../utils/errorHandler.js'
import { formatPhoneNumber } from '../utils/helpers.js'

const createCustomerService = async ({ name, email, phone }) => {
  const existing = await customerRepository.getCustomerByEmail({ email })

  if (existing) {
    throw errorHandler.badRequest('Customer with this email already exists')
  }

  const onlyPhoneNumbers = formatPhoneNumber(phone)

  const customer = await customerRepository.createCustomer({
    name,
    email,
    phone: onlyPhoneNumbers,
  })

  return customer
}

const getCustomers = async ({ page = 1, limit = 10 }) => {
  const pageNumber = page <= 0 ? 1 : page
  const offset = (pageNumber - 1) * limit

  const customers = await customerRepository.getCustomers({
    offset,
    limit,
  })

  return customers
}

export default {
  createCustomerService,
  getCustomers,
}
