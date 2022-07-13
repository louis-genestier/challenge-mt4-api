import { PrismaClient } from '@prisma/client'
import { Challenge, Question } from '@prisma/client'

export class ChallengeRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(): Promise<Challenge[]> {
    const challenges = await this.prisma.challenge.findMany({
      include: {
        promotions: true,
      },
    })

    return challenges
  }

  async findById(
    id: number,
    includeQuestions: boolean,
  ): Promise<
    | (Challenge & {
        questions: Question[]
      })
    | null
  > {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
      include: {
        questions: includeQuestions,
      },
    })

    return challenge
  }

  async close(id: number): Promise<Challenge | null> {
    const challenge = await this.prisma.challenge.update({
      where: { id },
      data: { is_open: false },
    })

    return challenge
  }
}
