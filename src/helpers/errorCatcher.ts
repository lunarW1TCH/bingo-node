import { NextFunction } from 'express';

export interface RouteError extends Error {
  statusCode?: number;
  errorMsg: string;
}

const errorCatcher = (
  err: RouteError,
  next: NextFunction,
  statusCode = 500,
  errorMsg = 'Something went wrong'
) => {
  if (!err.statusCode) {
    err.statusCode = statusCode;
    err.errorMsg = errorMsg;
  }
  next(err);
};

export default errorCatcher;
