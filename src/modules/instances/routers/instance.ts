import { Router } from 'express'

import { InstanceController } from 'modules/instances/controllers/instance'
import { authenticateJwt } from 'shared/infra/http/middlewares/authenticateJwt'
import { createInstanceDto } from 'modules/instances/dto/createInstanceDto'
import { Instance } from '@prisma/client'

export const instanceRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const instanceController = new InstanceController()

  router.use(authenticateJwt)

  router.post<Record<string, unknown>, Instance, createInstanceDto>(
    '/',
    async (req, res, next) => {
      try {
        const { id } = req.user
        const instance = await instanceController.createInstance({
          ...req.body,
          student_id: id,
        })
        return res.json(instance)
      } catch (e) {
        next(e)
      }
    },
  )

  router.get<Record<string, unknown>, Instance | null, number>(
    '/',
    async (req, res, next) => {
      try {
        const { id } = req.user
        const instance = await instanceController.getInstance(id)
        return res.json(instance)
      } catch (e) {
        next(e)
      }
    },
  )

  return router
}
