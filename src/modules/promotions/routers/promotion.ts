import { Router, Request } from 'express'

import { PromotionController } from 'modules/promotions/controllers/promotion'
import { authenticateJwt } from 'shared/infra/http/middlewares/authenticateJwt'
import { isAdmin } from 'shared/infra/http/middlewares/isAdmin'
import { createWorkbook } from 'shared/utils/excel'

export const promotionRouter = (): Router => {
  const router = Router({ mergeParams: true })
  const promotionController = new PromotionController()

  router.use(authenticateJwt)

  router.get(
    '/:promotionId/challenges/:challengeId/grades.xlsx',
    isAdmin,
    async (
      req: Request<{ promotionId: string; challengeId: string }>,
      res,
      next,
    ) => {
      try {
        const { promotionId, challengeId } = req.params
        const grades = await promotionController.getPromotionsGrades(
          +promotionId,
          +challengeId,
        )

        const workbook = await createWorkbook(grades)

        await workbook.xlsx.write(res)
        res.end()
      } catch (e) {
        next(e)
      }
    },
  )

  return router
}
