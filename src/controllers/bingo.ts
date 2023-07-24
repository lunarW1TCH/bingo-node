import { Request, Response, NextFunction } from 'express';
import BingoModel, { Bingo } from '../models/Bingo';
import errorCatcher, { RouteError } from '../helpers/errorCatcher';
import { PER_PAGE } from '../helpers/globals';
import { validationResult } from 'express-validator';

interface GetAllQuery {
  page?: string;
}

interface GetBingoByIdQuery {
  id?: string;
}

interface GetSearchQuery {
  page?: string;
  name?: string;
}

const getBingoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query as GetBingoByIdQuery;
  const id = query.id;

  try {
    if (!id) {
      const newError = new Error() as RouteError;
      newError.statusCode = 422;
      newError.message = 'No bingo with that id.';
      throw newError;
    }

    const result = await BingoModel.findById(id);
    console.log(result);
    res.json({ result });
  } catch (err) {
    const error = err as RouteError;
    error.statusCode = 404;
    errorCatcher(error, next);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query as GetAllQuery;
  const page = query.page || '1';

  console.log(query);

  try {
    const results = await BingoModel.find()
      .skip((parseInt(page) - 1) * PER_PAGE)
      .limit(PER_PAGE);

    res.json({ results });
  } catch (err) {
    const error = err as RouteError;
    errorCatcher(error, next);
  }
};

const getSearch = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query as GetSearchQuery;
  const page = query.page || '1';
  const name = query.name || '';

  try {
    const results = await BingoModel.find({ name: new RegExp(name, 'i') })
      .skip((parseInt(page) - 1) * PER_PAGE)
      .limit(PER_PAGE);

    const docCount = await BingoModel.countDocuments({
      name: new RegExp(name, 'i'),
    });

    const pages = Math.ceil(docCount / PER_PAGE);

    res.json({ results, pages });
  } catch (err) {
    const error = err as RouteError;
    errorCatcher(error, next);
  }
};

const postCreate = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  const body = req.body as Bingo;
  const bingo = new BingoModel(body);

  try {
    if (!errors.isEmpty()) {
      const validationError = new Error() as RouteError;
      validationError.errorMsg = 'Received data is invalid';
      validationError.statusCode = 422;

      throw validationError;
    }

    const result = await bingo.save();
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    const error = err as RouteError;
    errorCatcher(error, next);
  }
};

export default { postCreate, getAll, getSearch, getBingoById };
