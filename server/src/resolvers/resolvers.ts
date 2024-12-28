import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import User from '../models/user'; // Ensure User is correctly exported as a default export from user.ts
import { Context } from '../types/context'; // Ensure Context is correctly exported from context.ts

export const resolvers: IResolvers = {
  Query: {
    me: async (_: any, __: any, { user, isAuth }: Context) => {
      if (!isAuth) throw new AuthenticationError('Not authenticated');
      return user;
    },
    users: async (_: any, __: any, { user, isAuth }: Context) => {
      if (!isAuth || user?.role !== 'ADMIN') {
        throw new AuthenticationError('Not authorized');
      }
      return User.find();
    }
  },

  Mutation: {
    signUp: async (_: any, { input }: { input: any }) => {
      const { username, email, password } = input;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (existingUser) {
        throw new UserInputError('User already exists');
      }

      const user = await User.create({
        username,
        email,
        password
      });

      const token = user.generateToken();

      return {
        token,
        user
      };
    },

    login: async (_: any, { input }: { input: any }) => {
      const { email, password } = input;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new UserInputError('Invalid credentials');
      }

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UserInputError('Invalid credentials');
      }

      const token = user.generateToken();

      return {
        token,
        user
      };
    }
  }
};