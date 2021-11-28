import { validationResult } from 'express-validator';
import { CustomError } from '../app';
import { check } from 'express-validator';

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

export const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

export const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

export const validateTransaction = [
  check('cryptoId')
    .exists({ checkFalsy: true })
    .withMessage('There was an error with your transaction.'),
  check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('There was an error with your transaction.'),
    check('quantity')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('There was an error with your transaction.'),
    check('buy')
    .exists({ checkFalsy: true })
    .isBoolean()
    .withMessage('There was an error with your transaction.')
]
