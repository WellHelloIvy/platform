"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const sequelize_1 = require("sequelize");
const isProduction = config_1.environment === 'production';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
if (!isProduction) {
    app.use((0, cors_1.default)());
}
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false
}));
app.use((0, csurf_1.default)({
    cookie: {
        secure: isProduction,
        //@ts-ignore
        sameSite: isProduction && "Lax",
        httpOnly: true,
    },
}));
app.use(routes_1.default);
class CustomError extends Error {
    constructor(error) {
        super(error);
        this.title = '';
        this.errors = [];
        this.status = 0;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
app.use((_req, _res, next) => {
    const err = new CustomError("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
app.use((err, _req, _res, next) => {
    if (err instanceof sequelize_1.ValidationError) {
        const error = new CustomError("The resource could not be validated");
        error.errors = err.errors.map((e) => e.message);
        error.title = 'Validation error';
        err = error;
    }
    next(err);
});
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});
exports.default = app;
