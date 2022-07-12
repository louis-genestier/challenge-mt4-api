import express, { Express, json } from 'express'
import cors from 'cors'

import { config } from 'shared/config'
import { authRouter } from 'modules/students/routers/auth'
import { instanceRouter } from 'modules/instances/routers/instance'
import { errorHandler } from 'shared/infra/http/middlewares/errorHandler'
import { logger } from 'shared/utils/logger'
import { challengeRouter } from 'modules/challenges/routers/challenge'
import { generateData } from 'shared/infra/db/fixtures'
import { promotionRouter } from 'modules/promotions/routers/promotion'

export class Server {
  private readonly app: Express

  constructor() {
    this.app = express()
  }

  async start() {
    try {
      const { port } = config.api
      this.app.use(cors())
      this.app.use(json())
      this.app.use('/auth/user', authRouter())
      this.app.use('/instances', instanceRouter())
      this.app.use('/challenges', challengeRouter())
      this.app.use('/promotions', promotionRouter())
      this.app.use(errorHandler)
      await generateData()

      await this.app.listen(port, () => {
        logger.info(
          `⚡️[server]: Server is running at https://localhost:${port}`,
        )
      })
    } catch (e) {
      logger.error(e)
    }
  }
}
