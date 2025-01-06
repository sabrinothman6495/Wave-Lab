import User from '../models/user.js';
import Sound from '../models/Sound.js';
import Category from '../models/Category.js';
import { signToken } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

// Type definitions for arguments and context
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

interface AddSoundArgs {
  name: string;
  fileUrl: string;
  category: string;
}

interface Context {
  user?: {
    _id: string;
  };
}

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find().populate('sounds');
      } catch (error) {
        throw new Error('Error fetching users.');
      }
    },

    user: async (_parent: any, { username }: { username: string }) => {
      try {
        const user = await User.findOne({ username }).populate('sounds');
        if (!user) throw new Error(`User with username ${username} not found.`);
        return user;
      } catch (error) {
        throw new Error('Error fetching user.');
      }
    },

    getSounds: async () => {
      try {
        return await Sound.find().populate('category');
      } catch (error) {
        throw new Error('Error fetching sounds.');
      }
    },

    getSound: async (_parent: any, { id }: { id: string }) => {
      try {
        const sound = await Sound.findById(id).populate('category');
        if (!sound) throw new Error(`Sound with ID ${id} not found.`);
        return sound;
      } catch (error) {
        throw new Error('Error fetching sound.');
      }
    },

    getCategories: async () => {
      try {
        return await Category.find();
      } catch (error) {
        throw new Error('Error fetching categories.');
      }
    },

    me: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      try {
        return await User.findById(context.user._id).populate('sounds');
      } catch (error) {
        throw new Error('Error fetching your profile.');
      }
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      try {
        const user = await User.create(input);
        const token = signToken(user.email, user.username, user._id);
        return { token, user };
      } catch (error) {
        throw new Error('Error creating user.');
      }
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new AuthenticationError('Invalid credentials');

        const validPassword = await user.isCorrectPassword(password);
        if (!validPassword) throw new AuthenticationError('Invalid credentials');

        const token = signToken(user.email, user.username, user._id);
        return { token, user };
      } catch (error) {
        throw new Error('Error logging in.');
      }
    },

    addSound: async (_parent: any, { name, fileUrl, category }: AddSoundArgs) => {
      try {
        const sound = await Sound.create({ name, fileUrl, category });
        return sound.populate('category');
      } catch (error) {
        throw new Error('Error adding sound.');
      }
    },

    deleteSound: async (_parent: any, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      try {
        const sound = await Sound.findByIdAndDelete(id);
        if (!sound) throw new Error(`Sound with ID ${id} not found.`);
        return Boolean(sound);
      } catch (error) {
        throw new Error('Error deleting sound.');
      }
    },

    addCategory: async (_parent: any, { name }: { name: string }) => {
      try {
        return await Category.create({ name });
      } catch (error) {
        throw new Error('Error adding category.');
      }
    },

    deleteCategory: async (_parent: any, { id }: { id: string }) => {
      try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) throw new Error(`Category with ID ${id} not found.`);
        return Boolean(category);
      } catch (error) {
        throw new Error('Error deleting category.');
      }
    },

    createSound: async (
      _parent: any,
      { userId, title, audioUrl }: { userId: string; title: string; audioUrl: string }
    ) => {
      try {
        const sound = await Sound.create({ userId, title, audioUrl });
        return sound.populate('userId');
      } catch (error) {
        throw new Error('Error creating sound.');
      }
    },
  },
};

export default resolvers;
