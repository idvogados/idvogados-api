import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ValidateTokenService from '@modules/users/services/ValidateTokenService'

export default class ValidateTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.params

    const validateToken = container.resolve(ValidateTokenService)

    await validateToken.execute(token)

    return response.status(200).json()
  }
}
