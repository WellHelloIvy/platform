import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { environment } from './config'
import routes from './routes'
import { ValidationError } from 'sequelize'

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
      //@ts-ignore
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

export class CustomError extends Error {

  title: string;
  errors: Array<string>;
  status: number;

  constructor(error: string) {
    super(error);
    this.title = '';
    this.errors= [];
    this.status= 0
  }
}

type err = CustomError | ValidationError;


app.use((_req:any, _res:any, next:any) => {
  const err = new CustomError("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err:err, _req:any, _res:any, next:any) => {
  if (err instanceof ValidationError) {
    const error = new CustomError("The resource could not be validated")
    error.errors = err.errors.map((e) => e.message);
    error.title = 'Validation error';
    err = error;
  }
  next(err);
});

app.use((err:CustomError, _req:any, res:any, _next:any) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

export default app;
