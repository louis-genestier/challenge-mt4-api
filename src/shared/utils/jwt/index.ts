import { Student } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { config } from 'shared/config'

export class JWT {
  private async sign(payload: object, secret: string, opts: jwt.SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, opts, (err: Error | null, encoded: string | undefined) => {
        if (err) reject(err)

        resolve(encoded as string)
      })
    })
  }

  async getTokens(student: Student): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.sign(
      { id: student.id, email: student.email },
      config.jwt.accessToken.secret,
      { expiresIn: config.jwt.accessToken.exp }
    )
    const refreshToken = await this.sign(
      { id: student.id, email: student.email },
      config.jwt.refreshToken.secret,
      { expiresIn: config.jwt.refreshToken.exp }
    )

    return { accessToken, refreshToken }
  }
}