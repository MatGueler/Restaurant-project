import db from '../models/index.js'

const createCustomer = async ({ name, email, phone }) => {
  const customer = await db.Customer.create({ name, email, phone })

  return customer
}

const getCustomerByEmail = async ({ email }) => {
  const existing = await db.Customer.findOne({ where: { email } })
  return existing
}

export default { createCustomer, getCustomerByEmail }
