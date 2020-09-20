import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'
import ValidateTokenController from '../controllers/ValidateTokenController'

const passwordRouter = Router()

const passwordController = new ForgotPasswordController()
const resetController = new ResetPasswordController()
const validateTokenController = new ValidateTokenController()

passwordRouter.post(
  '/password/forgot',
  celebrate({
    [Segments.BODY]: { email: Joi.string().required() }
  }),
  passwordController.create
)
passwordRouter.post(
  '/password/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetController.create
)
passwordRouter.get(
  '/password/token/:token',
  celebrate({
    [Segments.QUERY]: {
      token: Joi.string().required()
    }
  }),
  validateTokenController.create
)

export default passwordRouter
