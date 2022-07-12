import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import { ApiError } from 'shared/infra/http/errors/apiError'

export const validate = (schema: Joi.Schema) => (req: Request<object>, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body)
  if (error) {
    return next(new ApiError(400, error.message))
  }
  return next()
}