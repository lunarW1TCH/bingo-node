import { Schema, model } from 'mongoose';

export interface Bingo {
  name: string;
  description: string;
  colors: {
    text: string;
    background: string;
    border: string;
  };
  values: {
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    a5: string;
    b1: string;
    b2: string;
    b3: string;
    b4: string;
    b5: string;
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
    d1: string;
    d2: string;
    d3: string;
    d4: string;
    d5: string;
    e1: string;
    e2: string;
    e3: string;
    e4: string;
    e5: string;
  };
}

const ColorsSchema = new Schema<Bingo['colors']>({
  text: { type: String, required: true },
  background: { type: String, required: true },
  border: { type: String, required: true },
});

const ValuesSchema = new Schema<Bingo['values']>({
  a1: { type: String, required: true },
  a2: { type: String, required: true },
  a3: { type: String, required: true },
  a4: { type: String, required: true },
  a5: { type: String, required: true },
  b1: { type: String, required: true },
  b2: { type: String, required: true },
  b3: { type: String, required: true },
  b4: { type: String, required: true },
  b5: { type: String, required: true },
  c1: { type: String, required: true },
  c2: { type: String, required: true },
  c3: { type: String, required: true },
  c4: { type: String, required: true },
  c5: { type: String, required: true },
  d1: { type: String, required: true },
  d2: { type: String, required: true },
  d3: { type: String, required: true },
  d4: { type: String, required: true },
  d5: { type: String, required: true },
  e1: { type: String, required: true },
  e2: { type: String, required: true },
  e3: { type: String, required: true },
  e4: { type: String, required: true },
  e5: { type: String, required: true },
});

const BingoSchema = new Schema<Bingo>(
  {
    name: { type: String, required: true },
    colors: {
      type: ColorsSchema,
      required: true,
    },
    description: { type: String, required: true },
    values: {
      type: ValuesSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const BingoModel = model('Bingo', BingoSchema);

export default BingoModel;
