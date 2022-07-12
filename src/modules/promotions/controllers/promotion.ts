import { PromotionRepo } from 'modules/promotions/repos/promotion'
import { IStudentGrade } from 'modules/promotions/interfaces/promotionsGrades'

export class PromotionController {
  private readonly promotionRepo: PromotionRepo

  constructor() {
    this.promotionRepo = new PromotionRepo()
  }

  async getPromotionsGrades(
    promotionId: number,
    challengeId: number,
  ): Promise<IStudentGrade[]> {
    const grades = await this.promotionRepo.getPromotionsGrades(
      promotionId,
      challengeId,
    )

    return grades
  }
}
