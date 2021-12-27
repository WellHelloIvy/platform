"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.restoreUser = exports.setTokenCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../db/models"));
const app_1 = require("../app");
const { jwtConfig } = require('../config');
const { secret, expiresIn } = jwtConfig;
const setTokenCookie = (res, user) => {
    const token = jsonwebtoken_1.default.sign({ data: user.toSafeObject() }, secret, { expiresIn: parseInt(expiresIn) });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie('token', token, {
        maxAge: parseInt(expiresIn) * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax",
    });
    return token;
};
exports.setTokenCookie = setTokenCookie;
const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    return jsonwebtoken_1.default.verify(token, secret, (err, jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next();
        }
        try {
            const { id } = jwtPayload.data;
            req.user = yield models_1.default.User.scope('currentUser').findByPk(id);
        }
        catch (e) {
            res.clearCookie('token');
            return next();
        }
        if (!req.user)
            res.clearCookie('token');
        return next();
    }));
};
exports.restoreUser = restoreUser;
const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user)
            return next();
        const err = new app_1.CustomError('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    },
];
exports.requireAuth = requireAuth;
