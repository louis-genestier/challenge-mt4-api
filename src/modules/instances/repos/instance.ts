import { Instance, PrismaClient } from '@prisma/client'

import { CreateInstanceWithStudentDto } from 'modules/instances/dto/createInstanceDto'

export class InstanceRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async save(dto: CreateInstanceWithStudentDto): Promise<Instance> {
    const instance = await this.prisma.instance.create({
      data: dto,
    })

    return instance
  }

  async getInstance(student_id: number): Promise<Instance | null> {
    const instance = await this.prisma.instance.findUnique({
      where: { student_id },
    })

    return instance
  }
}
