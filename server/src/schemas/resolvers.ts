import User from '../models/user.js';
import Sound from '../models/Sound.js';
import Category from '../models/Category.js';
import { signToken } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

// Type definitions
interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface Context {
  user?: {
    _id: string;
  };
}

const resolvers = {
  Query: {
    users: async () => User.find().populate('sounds'),
    user: async (_parent: any, { username }: { username: string }) =>
      User.findOne({ username }).populate('sounds'),
    getSounds: async () => Sound.find().populate('category'),
    getSound: async (_parent: any, { id }: { id: string }) => {
      const sound = await Sound.findById(id).populate('category');
      if (!sound) throw new Error(`Sound with ID ${id} not found.`);
      return sound;
    },
    getCategories: async () => Category.find(),
    me: async (_parent: any, _args: any, context: Context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('sounds');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create(input);
      const token = signToken(user.email, user.username, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');
      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) throw new AuthenticationError('Invalid credentials');
      const token = signToken(user.email, user.username, user._id);
      return { token, user };
    },
    addSound: async (_parent: any, { name, fileUrl, category }: { name: string; fileUrl: string; category: string }) => {
      const sound = await Sound.create({ name, fileUrl, category });
      return sound.populate('category');
    },
    deleteSound: async (_parent: any, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      const sound = await Sound.findByIdAndDelete(id);
      if (!sound) throw new Error(`Sound with ID ${id} not found.`);
      return Boolean(sound);
    },
    addCategory: async (_parent: any, { name }: { name: string }) => {
      return Category.create({ name });
    },
    deleteCategory: async (_parent: any, { id }: { id: string }) => {
      const category = await Category.findByIdAndDelete(id);
      if (!category) throw new Error(`Category with ID ${id} not found.`);
      return Boolean(category);
    },
    createSound: async (
      _parent: any,
      { userId, title, audioUrl }: { userId: string; title: string; audioUrl: string }
    ) => {
      const sound = await Sound.create({ userId, title, audioUrl });
      return sound.populate('userId');
    },
  },
};

export default resolvers;
