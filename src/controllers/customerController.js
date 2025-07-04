import createCustomerService from '../services/customerService.js';

const createCustomer = async (req, res) => {
    try {
        const customer = await createCustomerService(req.body);
        return res.status(201).json(customer);
    } catch (err) {
        return res.status(err.status || 500).json({ error: err.message || 'Erro interno no servidor' });
    }
};

export default { createCustomer };
