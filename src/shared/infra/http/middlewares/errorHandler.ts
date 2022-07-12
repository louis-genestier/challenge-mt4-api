import { NextFunction, Request, Response } from 'express'

import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ApiError)
    return res.status(err.httpCode).json(err.json)
  return res.status(HttpErrorCode.InternalError).json(err.message)
}
