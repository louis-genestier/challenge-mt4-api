import { Router } from 'express'
import Joi from 'joi'

import { registerUserDto } from 'modules/students/dtos/registerStudentDto'
import { loginStudentDto } from 'modules/students/dtos/loginStudentDto'
import { StudentController } from 'modules/students/controllers/student'
import { responseAuthDto } from 'modules/students/dtos/responseAuthDto'
import { responseRefreshTokenDTO } from 'modules/students/dtos/responseRefreshTokenDto'
import { validate } from 'shared/infra/http/middlewares/validate'

const studentCreatePostSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  promotion_id: Joi.number().required(),
})

export const studentLoginPostSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const authRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const studentController = new StudentController()

  router.post<Record<string, unknown>, responseAuthDto, registerUserDto>(
    '/',
    validate(studentCreatePostSchema),
    async (req, res, next) => {
      try {
        const response = await studentController.createUser(req.body)
        return res.json(response)
      } catch (e) {
        next(e)
      }
    },
  )

  router.post<Record<string, unknown>, responseAuthDto, loginStudentDto>(
    '/login',
    validate(studentLoginPostSchema),
    async (req, res, next) => {
      try {
        const response = await studentController.login(req.body)
        return res.json(response)
      } catch (e) {
        next(e)
      }
    },
  )

  router.post<Record<string, unknown>, responseRefreshTokenDTO, null>(
    '/refresh_token',
    async (req, res, next) => {
      try {
        const tokens = await studentController.refreshToken(
          req.headers['refresh-token'] as string | undefined,
        )

        return res.json({ ...tokens })
      } catch (e) {
        next(e)
      }
    },
  )

  return router
}
