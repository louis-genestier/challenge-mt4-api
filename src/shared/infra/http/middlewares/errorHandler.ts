import { NextFunction, Request, Response } from 'express'

import { ApiError } from 'shared/infra/http/errors/apiError'

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  return res.status(err.httpCode).json(err.json)
}
