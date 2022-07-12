import { Student } from '@prisma/client'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'

import { config } from 'shared/config'
import { role } from 'shared/types/roles'

export interface IJwtPayload {
  id: number
  email: string
  roles: role[]
}

export class JWT {
  private async sign(
    payload: object,
    secret: string,
    opts: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret,
        opts,
        (err: Error | null, encoded: string | undefined) => {
          if (err) reject(err)

          resolve(encoded as string)
        },
      )
    })
  }

  async verify(
    token: string,
    secret: string,
    opts: jwt.VerifyOptions,
  ): Promise<IJwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        secret,
        opts,
        (err: Error | null, decoded: Jwt | JwtPayload | string | undefined) => {
          if (err) reject(err)

          resolve(decoded as IJwtPayload)
        },
      )
    })
  }

  async getTokens(
    student: Student,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.sign(
      { id: student.id, email: student.email },
      config.jwt.accessToken.secret,
      { expiresIn: config.jwt.accessToken.exp },
    )
    const refreshToken = await this.sign(
      { id: student.id, email: student.email },
      config.jwt.refreshToken.secret,
      { expiresIn: config.jwt.refreshToken.exp },
    )

    return { accessToken, refreshToken }
  }
}
