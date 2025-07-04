import { createCustomerRepository, getCustomerByEmail } from '../repository/customerRepository.js';
import errorHandler from '../utils/errorHandler.js';

const createCustomerService = async ({ name, email, phone }) => {
    const existing = await getCustomerByEmail({ email });

    if (existing) {
        throw errorHandler.badRequest('Customer with this email already exists');
    }

    const customer = await createCustomerRepository({ name, email, phone });
    return customer;
};

export default createCustomerService;
