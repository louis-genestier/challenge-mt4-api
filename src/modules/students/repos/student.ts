import { PrismaClient, Student } from '@prisma/client'
import bcrypt from 'bcrypt'

import { registerUserDto } from 'modules/students/dtos/registerStudentDto'

export class StudentRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async exists(email: string): Promise<boolean> {
    const student = await this.prisma.student.findUnique({
      where: { email },
    })

    return !!student
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student: Student | null = await this.prisma.student.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    })

    return student
  }

  async save(dto: registerUserDto): Promise<Student> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const student = await this.prisma.student.create({
      data: { ...dto, password: hashedPassword },
    })

    return student
  }
}
