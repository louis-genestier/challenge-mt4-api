import { Request, Response, NextFunction } from 'express'

import { ApiError } from 'shared/infra/http/errors/apiError'
import { HttpErrorCode } from 'shared/infra/http/errors/httpErrorCode'

export const isAdmin = async (
  req: Request<object>,
  res: Response,
  next: NextFunction,
) => {
  const { roles } = req.user
  if (!roles?.includes('admin')) {
    return next(new ApiError(HttpErrorCode.Unauthorized, 'Unauthorized'))
  }
  next()
}
