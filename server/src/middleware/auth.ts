import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const user = await User.findById(decoded.id);
      
      (req as any).user = user;
      (req as any).isAuth = Boolean(user);
    } else {
      (req as any).isAuth = false;
    }
    
    next();
  } catch (error) {
    (req as any).isAuth = false;
    next();
  }
};