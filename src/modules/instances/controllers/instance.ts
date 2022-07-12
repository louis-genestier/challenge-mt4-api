import { Instance } from '@prisma/client'

import { InstanceRepo } from 'modules/instances/repos/instance'
import { CreateInstanceWithStudentDto } from 'modules/instances/dto/createInstanceDto'
import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'

export class InstanceController {
  private readonly instanceRepo: InstanceRepo

  constructor() {
    this.instanceRepo = new InstanceRepo()
  }

  async createInstance(dto: CreateInstanceWithStudentDto): Promise<Instance> {
    const instance = await this.instanceRepo.save(dto)

    return instance
  }

  async getInstance(student_id: number): Promise<Instance | null> {
    const instance = await this.instanceRepo.getInstance(student_id)

    if (!instance)
      throw new ApiError(HttpErrorCode.NotFound, 'Instance not found')

    return instance
  }
}
