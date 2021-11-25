import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import {environment} from './config'
import routes from './routes'

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

class CustomError extends Error {

  title: string;
  errors: Array<string>;
  status: number;
  
  constructor(error: string) {
    super(error);

    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

app.use((_req, _res, next) => {
  const err = new CustomError("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

export default app;
