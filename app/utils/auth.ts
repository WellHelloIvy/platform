import jwt from 'jsonwebtoken';
import  db from '../db/models';
import { DefaultUser } from '../db/models/user';
import { CustomError } from '../app';

const { jwtConfig } = require('../config');

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

const { secret, expiresIn }: JwtConfig = jwtConfig;

const setTokenCookie = (res:any, user:DefaultUser) => {
  const token:string = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) },
  );

  const isProduction:boolean = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: parseInt(expiresIn) * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};

interface Cookie {
  token:string;

}

const restoreUser = (req:any, res:any, next:any) => {
  const { token }:Cookie = req.cookies;

  return jwt.verify(token, secret, async (err:any, jwtPayload:any) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await db.User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = [
  restoreUser,
  function (req:any, res:any, next:any) {
    if (req.user) return next();

    const err = new CustomError('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  },
];

export { setTokenCookie, restoreUser, requireAuth };
