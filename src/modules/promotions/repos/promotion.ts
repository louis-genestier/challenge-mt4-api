import { PrismaClient } from '@prisma/client'
import { IStudentGrade } from '../interfaces/promotionsGrades'

export class PromotionRepo {
  private readonly prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async getPromotionsGrades(
    promotionId: number,
    challengeId: number,
  ): Promise<IStudentGrade[]> {
    const grades = await this.prisma.grade.findMany({
      where: {
        challenge_id: challengeId,
        student: {
          promotion_id: promotionId,
        },
      },
      select: {
        grade: true,
        created_at: true,
        student: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    })

    return grades
  }
}
