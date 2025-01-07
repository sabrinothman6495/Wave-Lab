import express from 'express';
import path from 'node:path';
import cors from 'cors';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import authenticateToken from './utils/auth.js';

const startApolloServer = async () => {
  const app = express();
  
  // Add CORS middleware before other middleware
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  await db();

  app.use('/graphql', expressMiddleware(server, {
    context: authenticateToken
  }));

  const PORT = process.env.PORT || 3001;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer().catch(err => {
  console.error('Error starting server:', err);
});