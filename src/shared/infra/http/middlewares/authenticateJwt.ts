import { Request, Response, NextFunction } from 'express'

import { config } from 'shared/config'
import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'
import { JWT } from 'shared/utils/jwt'

export const authenticateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jwt = new JWT()
  const authHeader = req.headers.authorization

  if (!authHeader)
    return next(new ApiError(HttpErrorCode.Unauthorized, 'Unauthorized'))

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await jwt.verify(token, config.jwt.accessToken.secret, {})

    req.user = decoded
    next()
  } catch (error) {
    next(new ApiError(HttpErrorCode.Unauthorized, 'Unauthorized'))
  }
}
