import { Challenge } from '@prisma/client'

import { ChallengeRepo } from 'modules/challenges/repos/challenge'
import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'

export class ChallengeController {
  private readonly challengeRepo: ChallengeRepo

  constructor() {
    this.challengeRepo = new ChallengeRepo()
  }

  async findById(id: number): Promise<Challenge> {
    const challenge = await this.challengeRepo.findById(id)

    if (!challenge)
      throw new ApiError(HttpErrorCode.NotFound, 'Challenge not found')

    return challenge
  }

  async close(id: number): Promise<Challenge> {
    const challenge = await this.challengeRepo.close(id)

    if (!challenge)
      throw new ApiError(HttpErrorCode.NotFound, 'Challenge not found')

    return challenge
  }
}
