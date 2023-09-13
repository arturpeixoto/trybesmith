import { NextFunction, Request, Response } from 'express';

async function checkPost(req: Request, res:Response, next: NextFunction) {
  const { name, price, orderId } = req.body;
  if (!name || !price || !orderId) return res.status(400).json({ message: 'Invalid fields' });
  next();
}

export default {
  checkPost,
};