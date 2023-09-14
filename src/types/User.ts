import { ServiceResponse } from './ServiceResponse';

export type User = {
  id: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
};

export type LoginResponse = ServiceResponse<{ token: string }>;