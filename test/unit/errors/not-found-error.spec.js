const NotFoundError = require('../../../src/errors/not-found-error')

describe('[Unit] errors/not-found-error', () => {
  const error = new NotFoundError()

  it('should extends from Error class', () => {
    expect(NotFoundError.prototype).to.be.instanceOf(Error)
  })
  it('should set name as NotFoundError', () => {
    expect(error.name).to.be.eql('NotFoundError')
  })

  it('should use default error message', () => {
    expect(error.message).to.be.eql('Not found')
  })

  context('when custom message was given', () => {
    const errorWithCustomMessage = new NotFoundError('my custom message')

    it('should use given message', () => {
      expect(errorWithCustomMessage.message).to.be.eql('my custom message')
    })
  })
})
