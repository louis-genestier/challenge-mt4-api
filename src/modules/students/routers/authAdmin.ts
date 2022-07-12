import { Router } from 'express'

import { studentLoginPostSchema } from 'modules/students/routers/auth'
import { loginStudentDto } from 'modules/students/dtos/loginStudentDto'
import { StudentController } from 'modules/students/controllers/student'
import { responseAuthDto } from 'modules/students/dtos/responseAuthDto'
import { validate } from 'shared/infra/http/middlewares/validate'

export const authRouterAdmin = (): Router => {
  const router = Router({ mergeParams: true })

  const studentController = new StudentController()

  router.post<Record<string, unknown>, responseAuthDto, loginStudentDto>(
    '/login',
    validate(studentLoginPostSchema),
    async (req, res, next) => {
      try {
        const response = await studentController.loginAdmin(req.body)
        return res.json(response)
      } catch (e) {
        next(e)
      }
    },
  )

  return router
}
