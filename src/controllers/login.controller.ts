import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req:Request, res:Response) {
  const { username, password } = req.body;
  const { status, data } = await loginService.login(username, password);
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);  
  }
  res.status(200).json(data);
}

export default {
  login,
};