import { jest } from '@jest/globals'
import errorHandlerResponse from '../../src/utils/errorHandlerResponse.js'

describe('errorHandlerResponse', () => {
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    next = jest.fn()
    jest.clearAllMocks()
  })

  it('should return an error with status 400 for badRequest', () => {
    errorHandlerResponse.badRequest({
      res,
      message: 'Bad request',
    })
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Bad request' })
  })

  it('should return an error with status 404 for notFound', () => {
    errorHandlerResponse.notFound({
      res,
      message: 'Not found',
    })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ error: 'Not found' })
  })

  it('should return an error with status 401 for unauthorized', () => {
    errorHandlerResponse.unauthorized({
      res,
      message: 'Unauthorized',
    })
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' })
  })

  it('should return an error with status 403 for forbidden', () => {
    errorHandlerResponse.forbidden({
      res,
      message: 'Forbidden',
    })
    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' })
  })

  it('should return an error with status 500 for internalServerError', () => {
    errorHandlerResponse.internalServerError({
      res,
      message: 'Internal server error',
    })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' })
  })

  it('should return an error with default message for internalServerError', () => {
    errorHandlerResponse.internalServerError({
      res,
    })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' })
  })
})
