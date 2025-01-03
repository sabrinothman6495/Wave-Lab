import User from '../models/user.js';

import Sound from '../models/Sound.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define types for the arguments
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

interface UserArgs {
  username: string;
}

interface SoundArgs {
  id: string;
  
}

interface SliderArgs {
  base: string;
  treble: string;
  mid: string;
}

interface Context {
  user?: {
    _id: string;
  };
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('sound');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('sound');
    },
    me: async (_parent: any, _args: any, context: Context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('sound');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
    getSound: async (_parent: any, { id }: SoundArgs) => {
      return Sound.findById(id);
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    createSound: async (_parent: any, { id }: SoundArgs) => {
      return Sound.findOne({ _id: id });
    },
    adjustSlider: async (_parent: any, { base, treble, mid }: SliderArgs) => {
      const sound = await Sound.create({ base, treble, mid });
      return sound;
    },
  },
};

export default resolvers;
