import jwt from 'jsonwebtoken';
import { User } from '../db/models';
import { DefaultUser } from '../db/models/user';

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
  const { token } = req.cookies;

  return jwt.verify(token, secret, async (err:any, jwtPayload:any): Promise<any> => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};
