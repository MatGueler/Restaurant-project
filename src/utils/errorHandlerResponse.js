const errorHandlerResponse = () => {
  const create = ({ res, status, message }) => {
    res.status(status).json({
      error: message || 'Internal Server Error',
    })
  }

  return {
    badRequest: (msg) => create({ ...msg, status: 400 }),
    notFound: (msg) => create({ ...msg, status: 404 }),
    unauthorized: (msg) => create({ ...msg, status: 401 }),
    forbidden: (msg) => create({ ...msg, status: 403 }),
    internalServerError: (msg) => create({ ...msg, status: 500 }),
  }
}

export default errorHandlerResponse()
