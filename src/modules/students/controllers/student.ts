import { Student } from '@prisma/client'
import bcrypt from 'bcrypt'

import { registerUserDto } from 'modules/students/dtos/registerStudentDto'
import { StudentRepo } from 'modules/students/repos/student'
import { JWT } from 'shared/utils/jwt'
import { loginStudentDto } from 'modules/students/dtos/loginStudentDto'
import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'

export class StudentController {

  private readonly studentRepo: StudentRepo
  private readonly jwt: JWT

  constructor() {
    this.studentRepo = new StudentRepo()
    this.jwt = new JWT()
  }

  async createUser(dto: registerUserDto): Promise<{ student: Student, accessToken: string, refreshToken: string }> {
    const studentExists = await this.studentRepo.exists(dto.email)

    if (studentExists) throw new ApiError(HttpErrorCode.BadRequest, 'user already exists')

    const student: Student = await this.studentRepo.save(dto)
    const tokens = await this.jwt.getTokens(student)

    return { student, ...tokens }
  }

  async login(dto: loginStudentDto): Promise<{ student: Student, accessToken: string, refreshToken: string }> {
    const studentExists = await this.studentRepo.exists(dto.email)

    if (!studentExists) throw new ApiError(HttpErrorCode.BadRequest, 'user does not exists')

    const student = await this.studentRepo.findByEmail(dto.email)

    const isPasswordValid = await bcrypt.compare(dto.password, student.password)

    if (!isPasswordValid) throw new ApiError(HttpErrorCode.BadRequest, 'bad combination')
    const tokens = await this.jwt.getTokens(student)

    return { student, ...tokens }
  }
}
