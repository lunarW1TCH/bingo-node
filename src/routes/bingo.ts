import { Router } from 'express';
import { body } from 'express-validator';

import bingoController from '../controllers/bingo';

const router = Router();

router.get('/id', bingoController.getBingoById);

router.get('/all', bingoController.getAll);

router.get('/search', bingoController.getSearch);

router.post(
  '/create',
  [
    body([
      'values.a1',
      'values.a2',
      'values.a3',
      'values.a4',
      'values.a5',
      'values.b1',
      'values.b2',
      'values.b3',
      'values.b4',
      'values.b5',
      'values.c1',
      'values.c2',
      'values.c3',
      'values.c4',
      'values.c5',
      'values.d1',
      'values.d2',
      'values.d3',
      'values.d4',
      'values.d5',
      'values.e1',
      'values.e2',
      'values.e3',
      'values.e4',
      'values.e5',
      'name',
    ])
      .trim()
      .custom(value => value.replace(/\n/gm, ''))
      .isLength({ min: 1, max: 40 }),
    body('description').trim().isLength({ min: 1, max: 255 }),
    body(['colors.text', 'colors.background', 'colors.border']).isHexColor(),
  ],
  bingoController.postCreate
);

export default router;
