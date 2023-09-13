import { NextFunction, Request, Response } from 'express';
import checkRequiredFields from '../utils/checkRequiredFields';

async function checkPostFields(req: Request, res:Response, next: NextFunction) {
  const { body } = req;
  const requiredFields = ['name', 'price'];
  const productError = checkRequiredFields(body, requiredFields);
  if (productError) return res.status(400).json({ message: productError });

  next();
}

async function checkInputtableFields(req: Request, res:Response, next: NextFunction) {
  const { name, price } = req.body;
  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  if (price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  next();
}

export default {
  checkPostFields,
  checkInputtableFields,
};