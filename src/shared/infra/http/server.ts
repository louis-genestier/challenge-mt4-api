import express, { Express, json } from 'express'

import { config } from 'shared/config'
import { authRouter } from 'modules/students/routers/auth'
import { errorHandler } from 'shared/infra/http/middlewares/errorHandler'
import { logger } from 'shared/utils/logger'

export class Server {
  private readonly app: Express

  constructor() {
    this.app = express()
  }

  async start() {
    try {
      const { port } = config.api
      this.app.use(json())
      this.app.use('/auth/user', authRouter())
      this.app.use(errorHandler)

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
