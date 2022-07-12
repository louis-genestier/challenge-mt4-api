import { Router } from 'express'
import Joi from 'joi'

import { InstanceController } from 'modules/instances/controllers/instance'
import { authenticateJwt } from 'shared/infra/http/middlewares/authenticateJwt'
import { createInstanceDto } from 'modules/instances/dto/createInstanceDto'
import { Instance } from '@prisma/client'
import { validate } from 'shared/infra/http/middlewares/validate'

const instancePostSchema = Joi.object().keys({
  ip: Joi.string().ip({
    version: ['ipv4']
  }).required(),
  user: Joi.string().required(),
})

export const instanceRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const instanceController = new InstanceController()

  router.use(authenticateJwt)

  router.post<Record<string, unknown>, Instance, createInstanceDto>(
    '/',
    validate(instancePostSchema),
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
