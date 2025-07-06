import db from '../models/index.js'

const createCustomer = async ({ name, email, phone }) => {
  const customer = await db.Customer.create({ name, email, phone })

  return customer
}

const getCustomerById = async (id) => {
  const existing = await db.Customer.findOne({ where: { id } })
  return existing
}

const getCustomerByEmail = async ({ email }) => {
  const existing = await db.Customer.findOne({ where: { email } })
  return existing
}

const getCustomers = async ({ offset, limit }) => {
  const where = {}

  const { count, rows } = await db.Customer.findAndCountAll({
    where,
    offset,
    limit,
    order: [['id', 'ASC']],
  })

  return {
    data: rows,
    meta: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      page: Math.floor(offset / limit) + 1,
    },
  }
}

export default {
  createCustomer,
  getCustomerById,
  getCustomerByEmail,
  getCustomers,
}
