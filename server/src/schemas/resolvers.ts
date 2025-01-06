import User from '../models/user.js';
import Sound from '../models/Sound.js';
import Category from '../models/Category.js';
import { signToken } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';

interface AddUserArgs {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    id: string;
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

interface GetSoundArgs {
  id: string;
}

interface AddSoundArgs {
  name: string;
  fileUrl: string;
  category: string;
}

interface DeleteSoundArgs {
  id: string;
}

interface AddCategoryArgs {
  name: string;
}

interface DeleteCategoryArgs {
  id: string;
}

interface CreateSoundArgs {
  userId: string;
  title: string;
  audioUrl: string;
}

const resolvers = {
  Query: {
    users: async (): Promise<InstanceType<typeof User>[]> => User.find().populate('sounds'),
    user: async (_parent: unknown, { email }: { email: string }) => User.findOne({ email }).populate('sounds'),
    getSounds: async (): Promise<InstanceType<typeof Sound>[]> => Sound.find().populate('category'),
    getSound: async (_parent: unknown, { id }: GetSoundArgs) => {
      const sound = await Sound.findById(id).populate('category');
      if (!sound) throw new Error(`Sound with ID ${id} not found.`);
      return sound;
    },
    getCategories: async (): Promise<typeof Category[]> => Category.find(),
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('sounds');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (_parent: unknown, { input }: AddUserArgs) => {
      const user = await User.create(input);
      const token = signToken(user.email, `${user.firstName} ${user.lastName}`, user._id as unknown as string, user.role);
      return { token, user };
    },
    login: async (_parent: unknown, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('Invalid credentials');
      const validPassword = await user.isCorrectPassword(password);
      if (!validPassword) throw new AuthenticationError('Invalid credentials');
      const token = signToken(user.email, `${user.firstName} ${user.lastName}`, user._id as unknown as string, user.role);
      return { token, user };
    },
    addSound: async (_parent: unknown, { name, fileUrl, category }: AddSoundArgs) => {
      const sound = await Sound.create({ name, fileUrl, category });
      return sound.populate('category');
    },
    deleteSound: async (_parent: unknown, { id }: DeleteSoundArgs, context: Context) => {
      if (!context.user) throw new AuthenticationError('Unauthorized');
      const sound = await Sound.findByIdAndDelete(id);
      if (!sound) throw new Error(`Sound with ID ${id} not found.`);
      return Boolean(sound);
    },
    addCategory: async (_parent: unknown, { name }: AddCategoryArgs) => {
      return Category.create({ name });
    },
    deleteCategory: async (_parent: unknown, { id }: DeleteCategoryArgs) => {
      const category = await Category.findByIdAndDelete(id);
      if (!category) throw new Error(`Category with ID ${id} not found.`);
      return Boolean(category);
    },
    createSound: async (_parent: unknown, { userId, title, audioUrl }: CreateSoundArgs) => {
      const sound = await Sound.create({ userId, title, audioUrl });
      return sound.populate('userId');
    },
  },
};

export default resolvers;
