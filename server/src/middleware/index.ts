import express from 'express';
import cors from 'cors';

const middleware = {
  cors: cors({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:3000'], // Added your actual port
    credentials: true
  }),
  
  json: express.json(),
  
  urlencoded: express.urlencoded({ extended: true }),

  errorHandler: (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
    return (err: any) => {
      console.error('Error:', err);
      res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    };
  }
};

export default middleware;