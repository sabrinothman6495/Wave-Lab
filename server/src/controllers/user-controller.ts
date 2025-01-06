import type { Request, Response } from 'express';
// Import the user model and signToken function
import User from '../models/user.js';
import { signToken } from '../utils/auth.js';


export const getUserProfile = (req: Request, res: Response) => {
    const user = req.user; // TypeScript now recognizes the 'user' property
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ profile: user });
  };

// Create user
export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);

  if (!user) {
    return res.status(400).json({ message: 'Something is wrong!' });
  }

  const token = signToken(user.username, user.password, user._id);
  return res.json({ token, user });
};

// Login user
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });

  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }

  const token = signToken(user.username, user.password, user._id);
  return res.json({ token, user });
};
