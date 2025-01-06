import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';


const router = Router();

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  error: string;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// Register endpoint
router.post(
  '/register',
  async (
    req: Request<{}, AuthResponse | ErrorResponse, AuthRequest>,
    res: Response<AuthResponse | ErrorResponse>
  ): Promise<Response<AuthResponse | ErrorResponse>> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const user = new User({ email, password });
      await user.save();

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ 
          error: 'Server configuration error: JWT_SECRET missing' 
        });
      }

      const token = jwt.sign(
        { userId: user._id },
        jwtSecret,
        { expiresIn: '24h' }
      );

      return res.status(201).json({ token });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        error: isError(error) ? error.message : 'Error creating user'
      });
    }
  }
);

// Login endpoint
router.post(
  '/login',
  async (
    req: Request<{}, AuthResponse | ErrorResponse, AuthRequest>,
    res: Response<AuthResponse | ErrorResponse>
  ): Promise<Response<AuthResponse | ErrorResponse>> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ 
          error: 'Server configuration error: JWT_SECRET missing' 
        });
      }

      const token = jwt.sign(
        { userId: user._id },
        jwtSecret,
        { expiresIn: '24h' }
      );

      return res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        error: isError(error) ? error.message : 'Error logging in'
      });
    }
  }
);

export default router;