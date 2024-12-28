import { Request } from 'express';
import { User } from '../models/user';

export interface Context {
  req: Request;
  user?: User;
  isAuth: boolean;
}