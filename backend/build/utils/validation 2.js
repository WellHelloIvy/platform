"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAsset = exports.validateTransaction = exports.validateSignup = exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const app_1 = require("../app");
const express_validator_2 = require("express-validator");
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg}`);
        const err = new app_1.CustomError('Bad request.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};
exports.validateLogin = [
    (0, express_validator_2.check)('email')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email.'),
    (0, express_validator_2.check)('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];
exports.validateSignup = [
    (0, express_validator_2.check)('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your first name.'),
    (0, express_validator_2.check)('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your last name.'),
    (0, express_validator_2.check)('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    (0, express_validator_2.check)('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];
exports.validateTransaction = [
    (0, express_validator_2.check)('cryptoId')
        .exists({ checkFalsy: true })
        .withMessage('1:There was an error with your transaction.'),
    (0, express_validator_2.check)('userId')
        .exists({ checkFalsy: true })
        .withMessage('2:There was an error with your transaction.'),
    (0, express_validator_2.check)('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('3:There was an error with your transaction.'),
    (0, express_validator_2.check)('quantity')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('4:There was an error with your transaction.'),
    (0, express_validator_2.check)('buy')
        .exists()
        .isBoolean()
        .withMessage('5:There was an error with your transaction.')
];
exports.validateAsset = [
    (0, express_validator_2.check)('cryptoId')
        .exists({ checkFalsy: true })
        .withMessage('6:There was an error with your transaction.'),
    (0, express_validator_2.check)('userId')
        .exists({ checkFalsy: true })
        .withMessage('7:There was an error with your transaction.'),
    (0, express_validator_2.check)('quantity')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('8:There was an error with your transaction.'),
];
