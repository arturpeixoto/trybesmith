import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';
import envArgs from '../envArgs';
import { LoginResponse } from '../types/User';

export const unauthorizedResponse: LoginResponse = {
  status: 'UNAUTHORIZED',
  data: { message: 'Username or password invalid' },
};

async function login(username: string, password: string): Promise<LoginResponse> {
  const user = await UserModel.findOne({ where: { username } });
  if (!user) {
    return unauthorizedResponse;
  }
  const isValidPassword = await bcrypt.compare(password, user.dataValues.password);
  if (!isValidPassword) {
    return unauthorizedResponse;
  }
  const token = jwt.sign({
    id: user.dataValues.id,
    username: user.dataValues.username,
  }, envArgs.jwtSecret);
  return {
    status: 'SUCCESSFUL',
    data: { token },
  };
} 

export default {
  login,
};