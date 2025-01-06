import type { Request, Response } from 'express';
import User from '../models/user.js'; 
import { signToken } from '../utils/auth.js';

interface CreateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user; 
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.json({ profile: user });
};

// Create user
export const createUser = async (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use!' });
    }

    // Create a new user
    const user = await User.create({ firstName, lastName, email, password });

    if (!user) {
      return res.status(400).json({ message: 'Something went wrong!' });
    }

    // Create token and send response
    const token = signToken(user.email, `${user.firstName} ${user.lastName}`, (user._id as unknown as string), (user as any).role);
    return res.json({ token, user });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Login user
export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await (user as any).isCorrectPassword(password);  

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // Create token and send response
    const token = signToken(user.email, `${user.firstName} ${user.lastName}`, (user._id as unknown as string), user.role);
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: (error as any).message });
  }
};
