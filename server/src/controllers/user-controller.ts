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

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Using _id from req.user (auth middleware sets this)
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch user details from the database by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the necessary user data, using firstName, lastName, and email
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      sounds: user.sounds, // list of saved sounds
    };

    return res.json({ profile: userProfile });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
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

    const correctPw = await user.isCorrectPassword(password);

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

