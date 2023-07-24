import { Router } from 'express';
import errorController from '../controllers/error';

const router = Router();

router.use('*', errorController.catchRouteError);

export default router;
