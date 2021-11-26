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
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) },
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: parseInt(expiresIn) * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax",
  });

  return token;
};
