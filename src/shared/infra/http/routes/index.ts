import { Router } from 'express'
import usersRouter from '@modules/users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes'
import passwordRouter from '@modules/users/infra/http/routes/password.routes'
import profileRouter from '@modules/users/infra/http/routes/profile.routes'

const routes = Router()

routes.use(usersRouter)
routes.use(sessionsRouter)
routes.use(passwordRouter)
routes.use(profileRouter)

export default routes
