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

export default createCustomerService
