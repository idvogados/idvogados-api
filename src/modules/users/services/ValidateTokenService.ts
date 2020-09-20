import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import { differenceInHours } from 'date-fns'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

@injectable()
class ValidateTokenService {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute(token: string): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const tokenCreatedAt = userToken.created_at

    if (differenceInHours(Date.now(), tokenCreatedAt) > 1) {
      throw new AppError('Token expired.')
    }

    await this.userTokensRepository.delete(userToken.id)
  }
}

export default ValidateTokenService
