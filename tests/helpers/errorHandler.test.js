import errorHandler from '../../src/utils/errorHandler'

describe('errorHandler utility', () => {
  it('should return an error with status 400 for badRequest', () => {
    const error = errorHandler.badRequest('Bad request')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Bad request')
    expect(error.status).toBe(400)
  })

  it('should return an error with status 404 for notFound', () => {
    const error = errorHandler.notFound('Not found')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Not found')
    expect(error.status).toBe(404)
  })

  it('should return an error with status 401 for unauthorized', () => {
    const error = errorHandler.unauthorized('Unauthorized')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Unauthorized')
    expect(error.status).toBe(401)
  })

  it('should return an error with status 403 for forbidden', () => {
    const error = errorHandler.forbidden('Forbidden')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Forbidden')
    expect(error.status).toBe(403)
  })

  it('should return an error with status 500 for internalServerError', () => {
    const error = errorHandler.internalServerError('Internal server error')
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('Internal server error')
    expect(error.status).toBe(500)
  })
})
