import { Request, Response, NextFunction } from 'express';
import type { ErrorRequestHandler } from 'express';
import { RouteError } from '../helpers/errorCatcher';

const catchRouteError = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
};

const runtimeError: ErrorRequestHandler = (
  error: RouteError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || 500).json({ message: error.errorMsg });
};

export default { catchRouteError, runtimeError };
