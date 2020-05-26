const sinon = require('sinon')
const httpStatus = require('http-status')
const logger = require('../../../src/client/logger-client')
const NotFoundError = require('../../../src/errors/not-found-error')
const errorsMiddleware = require('../../../src/middlewares/errors-middleware')

describe('[Unit] middlewares/errors-middleware', () => {
  const nextSpy = sinon.spy()
  const loggerErrorSpy = sinon.spy()
  const resSetHeaderSpy = sinon.spy()
  const resJsonSpy = sinon.spy()
  const resStatusSpy = sinon.stub().returns({ json: resJsonSpy })
  const reqMock = {
    originalUrl: '/foo/bar?name=john',
    query: { name: 'john' },
    headers: { auth: 'x-auth' }
  }
  const resMock = {
    setHeader: resSetHeaderSpy,
    status: resStatusSpy
  }

  before(() => {
    sinon.replace(logger, 'error', loggerErrorSpy)
  })

  after(() => {
    sinon.restore()
  })

  context('when throw known error', () => {
    const errorContentMock = {
      error: 'NotFoundError',
      message: 'entity not found',
      stack: 'code.js:123\nerror.js:456'
    }
    before(() => {
      const knownError = new NotFoundError(errorContentMock.message)
      knownError.stack = errorContentMock.stack
      errorsMiddleware(knownError, reqMock, resMock, nextSpy)
    })

    after(() => {
      sinon.resetHistory()
    })

    it('should log error information', () => {
      const calledCorrectly = loggerErrorSpy.calledWithMatch({
        error: errorContentMock.error,
        message: errorContentMock.message,
        stack: errorContentMock.stack.split('\n')
      })
      expect(calledCorrectly).to.be.true
    })

    it('should log request information', () => {
      const calledCorrectly = loggerErrorSpy.calledWithMatch({
        statusCode: httpStatus.NOT_FOUND,
        path: reqMock.originalUrl,
        query: reqMock.query,
        headers: reqMock.headers
      })
      expect(calledCorrectly).to.be.true
    })

    it('should set x-error header', () => {
      const calledCorrectly = resSetHeaderSpy.calledWith('x-error', true)
      expect(calledCorrectly).to.be.true
    })

    it('should response use error mapped status code', () => {
      const calledCorrectly = resStatusSpy.calledWith(httpStatus.NOT_FOUND)
      expect(calledCorrectly).to.be.true
    })

    it('should response return error', () => {
      const calledCorrectly = resJsonSpy.calledWith({
        error: errorContentMock.error,
        message: errorContentMock.message
      })
      expect(calledCorrectly).to.be.true
    })

    it('should call next pipeline function', () => {
      expect(nextSpy.calledOnce).to.be.true
    })
  })

  context('when throw unknown error', () => {
    const errorContentMock = {
      error: 'UnknownError',
      message: 'unknown message',
      stack: 'unknown-code.js:123\nclass-code.js:456'
    }
    class UnknownError extends Error {}
    before(() => {
      const unknownError = new UnknownError(errorContentMock.message)
      unknownError.stack = errorContentMock.stack
      errorsMiddleware(unknownError, reqMock, resMock, nextSpy)
    })

    after(() => {
      sinon.resetHistory()
    })
    it('should use status code 500 - INTERNAL_SERVER_ERROR', () => {
      const callLoggerCorrectly = loggerErrorSpy.calledWithMatch({ statusCode: httpStatus.INTERNAL_SERVER_ERROR })
      const callResCorrectly = resStatusSpy.calledWithMatch(httpStatus.INTERNAL_SERVER_ERROR)
      expect(callLoggerCorrectly).to.be.true
      expect(callResCorrectly).to.be.true
    })
  })
})
