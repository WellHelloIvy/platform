import { validationResult } from 'express-validator';
import { CustomError } from '../app';

const handleValidationErrors = (req:any, _res:any, next:any) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = new CustomError('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

export default {
  handleValidationErrors,
};
