import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { name, price, orderId } = req.body;
  const { status, data } = await productsService.create({ name, price, orderId: Number(orderId) });
  if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
  return res.status(201).json(data);
}

export default {
  create,
};