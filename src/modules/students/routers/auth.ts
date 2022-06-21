import { Router } from 'express'

import { registerUserDto } from 'modules/students/dtos/registerStudentDto';
import { loginStudentDto } from 'modules/students/dtos/loginStudentDto';
import { StudentController } from 'modules/students/controllers/student';
import { responseAuthDto } from 'modules/students/dtos/responseAuthDto';

export const authRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const studentController = new StudentController()

  router.post<Record<string, unknown>, responseAuthDto, registerUserDto>('/', async (req, res, next) => {
    try {
      const response = await studentController.createUser(req.body)
      return res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.post<Record<string, unknown>, responseAuthDto, loginStudentDto>('/login', async (req, res, next) => {
    try {
      const response = await studentController.login(req.body)
      return res.json(response)
    } catch (e) {
      next(e)
    }
  })

  return router
}