// errorHandler.js
const errorHandler = () => {
    const create = (message, status) => {
        const error = new Error(message);
        error.status = status;
        return error;
    };

    return {
        badRequest: (msg) => create(msg, 400),
        notFound: (msg) => create(msg, 404),
        unauthorized: (msg) => create(msg, 401),
        forbidden: (msg) => create(msg, 403),
        internalServerError: (msg) => create(msg, 500),
    };
};

export default errorHandler();
