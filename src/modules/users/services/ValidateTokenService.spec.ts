import { v4 as uuid } from 'uuid'

import AppError from '@shared/errors/AppError'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ValidateTokenService from './ValidateTokenService'

let fakeUserTokensRepository: FakeUserTokensRepository
let validateTokenService: ValidateTokenService

describe('Validate Token Service', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository()
    validateTokenService = new ValidateTokenService(fakeUserTokensRepository)
  })

  it('should be able to validate a valid token', async () => {
    const userId = uuid()
    const userToken = await fakeUserTokensRepository.generate(userId)

    expect(validateTokenService.execute(userToken.token)).toBeTruthy()
  })

  it('should be able to reject a invalid token', async () => {
    const userToken = await fakeUserTokensRepository.generate(
      'non-existing-token-id'
    )

    expect(
      validateTokenService.execute(userToken.token)
    ).rejects.toBeInstanceOf(AppError)
  })
})
