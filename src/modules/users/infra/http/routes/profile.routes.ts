import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { celebrate, Joi, Segments } from 'celebrate'

import ProfileController from '../controllers/ProfileController'

const profileController = new ProfileController()

const profileRouter = Router()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/profile', profileController.show)
profileRouter.put(
  '/profile',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      confirmed_password: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileController.update
)

export default profileRouter
