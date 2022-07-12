import { PrismaClient } from '@prisma/client'
import { Challenge } from '@prisma/client'

export class ChallengeRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findById(id: number): Promise<Challenge | null> {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
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
