import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { typeDefs, resolvers } from './schemas/index.js';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';




const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const app = express();

  // Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

};

startApolloServer();
