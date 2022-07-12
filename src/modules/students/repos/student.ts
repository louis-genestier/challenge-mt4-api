import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { registerUserDto } from 'modules/students/dtos/registerStudentDto'
import { IStudentWithRoles } from 'modules/students/interfaces/studentWithRoles'

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

  async findByEmail(email: string): Promise<IStudentWithRoles | null> {
    const student = await this.prisma.student.findUnique({
      where: { email },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    })

    return student
  }

  async save(dto: registerUserDto): Promise<IStudentWithRoles> {
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const student = await this.prisma.student.create({
      data: { ...dto, password: hashedPassword },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    })

    return student
  }
}
