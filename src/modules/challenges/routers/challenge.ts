import { Request, Router } from 'express'

import { authenticateJwt } from 'shared/infra/http/middlewares/authenticateJwt'
import { ChallengeController } from 'modules/challenges/controllers/challenge'
import { isAdmin } from 'shared/infra/http/middlewares/isAdmin'

export const challengeRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const challengeController = new ChallengeController()

  router.use(authenticateJwt)

  router.get('/:id', async (req: Request<{ id: string }>, res, next) => {
    try {
      const { id } = req.params
      const challenge = await challengeController.findById(+id)
      return res.json(challenge)
    } catch (e) {
      next(e)
    }
  })

  router.post(
    '/:id/close',
    isAdmin,
    async (req: Request<{ id: string }>, res, next) => {
      try {
        const { id } = req.params
        const challenge = await challengeController.close(+id)
        return res.json(challenge)
      } catch (e) {
        next(e)
      }
    },
  )

  return router
}
