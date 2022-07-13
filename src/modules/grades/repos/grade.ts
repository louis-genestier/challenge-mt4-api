import { Grade, PrismaClient } from '@prisma/client'

import { createGradeDto } from 'modules/grades/dtos/createGradeDto'

export class GradeRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async save(dto: createGradeDto): Promise<Grade> {
    const grade = await this.prisma.grade.create({
      data: dto,
    })

    return grade
  }
}
