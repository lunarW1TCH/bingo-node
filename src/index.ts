import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { connect } from 'mongoose';

import bingoRoutes from './routes/bingo';
import errorRoutes from './routes/error';
import corsMiddleware from './middleware/cors';

import errorController from './controllers/error';

dotenv.config();

const PORT = process.env.PORT as string;
const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

const app = express();
app.use(bodyParser.json());

// TODO: restrict to final domain
app.use(corsMiddleware);

app.use(bingoRoutes);

app.get('/', (req, res, next) => {
  return res.json({ message: 'test' });
});

app.use(errorRoutes);

app.use(errorController.runtimeError);

const run = async () => {
  try {
    await connect(MONGO_DB_URI);

    app.listen(parseInt(PORT));
  } catch (err) {
    console.log(err);
  }
};

run();
