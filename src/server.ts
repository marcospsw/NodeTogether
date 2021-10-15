import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import './database';
import 'express-async-errors';
import router from './routes';
import ErrorResponse from './utils/ErrorResponse';

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (
    err: ErrorResponse,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (err instanceof ErrorResponse) {
      return response.status(err.statusCode).json({
        statusCode: err.statusCode,
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
);

app.listen(3000, () => console.log(`Server is online on port: ${3000}`));
