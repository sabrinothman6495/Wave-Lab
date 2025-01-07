import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import authenticateToken from './utils/auth.js';
import middleware from './middleware/index.js';

const startApolloServer = async () => {
  const app = express();

  // Apply middleware
  app.use(middleware.cors);
  app.use(middleware.json);
  app.use(middleware.urlencoded);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    },
  });

  await server.start();
  await db();

  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Enhanced context with better error handling
      try {
        const contextValue = await authenticateToken({ req });
        return contextValue;
      } catch (error) {
        console.error('Context creation error:', error);
        return { user: null };
      }
    }
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Add error handling middleware last
  app.use(middleware.errorHandler);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});