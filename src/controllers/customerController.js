import customerService from '../services/customerService.js'

const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomerService(req.body)
    return res.status(201).json(customer)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers(req.query)
    return res.status(201).json(customers)
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' })
  }
}

export default { createCustomer, getCustomers }
