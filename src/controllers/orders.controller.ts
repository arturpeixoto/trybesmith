import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAll(req: Request, res: Response) {
  const { status, data } = await ordersService.getAll();
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);  
  }
  res.status(200).json(data);
}

export default {
  getAll,
};