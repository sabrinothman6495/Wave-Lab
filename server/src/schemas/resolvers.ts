import User from '../models/user.js';
import Sound from '../models/Sound.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { GraphQLError } from 'graphql';

interface Context {
  user?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SoundInput {
  title: string;
  audioData: string;  // Base64 encoded audio data
  instrument: {
    piano: boolean;
    guitar: boolean;
    trumpet: boolean;
  };
  duration?: number;
  waveformData?: number[];
  frequencyData?: number[];
}

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find().populate('sounds');
      } catch (error) {
        throw new GraphQLError('Failed to fetch users', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    user: async (_parent: unknown, { email }: { email: string }) => {
      try {
        const user = await User.findOne({ email }).populate('sounds');
        if (!user) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'NOT_FOUND' }
          });
        }
        return user;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to fetch user', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    getSounds: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const sounds = await Sound.find({ userId: context.user._id })
          .sort({ createdAt: -1 });  // Most recent first
        return sounds;
      } catch (error) {
        throw new GraphQLError('Failed to fetch sounds', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    getSound: async (_parent: unknown, { _id }: { _id: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const sound = await Sound.findOne({ _id, userId: context.user._id });
        if (!sound) {
          throw new GraphQLError('Sound not found', {
            extensions: { code: 'NOT_FOUND' }
          });
        }
        return sound;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to fetch sound', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const user = await User.findById(context.user._id).populate('sounds');
        if (!user) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'NOT_FOUND' }
          });
        }
        return user;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to fetch user profile', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },
  },

  Mutation: {
    addUser: async (_parent: unknown, { input }: { input: UserInput }) => {
      try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new GraphQLError('User already exists with this email', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
  
        // Create a new user
        const user = await User.create(input);
  
        // Return the newly created user
        return { user };
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to create user', {
          extensions: { code: 'DATABASE_ERROR' },
        });
      }
    },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(
          user.firstName,
          user.lastName,
          user.email,
          user._id
        );

        return { token, user };
      } catch (error) {
        if (error instanceof AuthenticationError) throw error;
        throw new GraphQLError('Login failed', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    createSound: async (
      _parent: unknown,
      {
        title,
        audioData,
        instrument,
        duration,
        waveformData,
        frequencyData,
      }: SoundInput,
      context: Context
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        // Validate audio data size (MongoDB has a 16MB document limit)
        const audioDataSize = new Blob([audioData]).size;
        if (audioDataSize > 15000000) { // 15MB limit to leave room for other fields
          throw new GraphQLError('Audio data exceeds maximum size limit', {
            extensions: { code: 'BAD_USER_INPUT' }
          });
        }

        const sound = await Sound.create({
          title,
          audioData,
          instrument,
          duration,
          waveformData,
          frequencyData,
          userId: context.user._id,
        });

        // Add the sound to the user's sounds array
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { sounds: sound._id } },
          { new: true }
        );

        return sound;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to create sound', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    deleteSound: async (_parent: unknown, { _id }: { _id: string }, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const sound = await Sound.findOneAndDelete({
          _id,
          userId: context.user._id,
        });

        if (!sound) {
          throw new GraphQLError('Sound not found', {
            extensions: { code: 'NOT_FOUND' }
          });
        }

        // Remove the sound from the user's sounds array
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { sounds: _id } },
          { new: true }
        );

        return true;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to delete sound', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },

    updateUserProfile: async (
      _parent: unknown,
      { firstName, lastName }: { firstName?: string; lastName?: string },
      context: Context
    ) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      try {
        const updateData: { firstName?: string; lastName?: string } = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          updateData,
          { new: true }
        ).populate('sounds');

        if (!updatedUser) {
          throw new GraphQLError('User not found', {
            extensions: { code: 'NOT_FOUND' }
          });
        }

        return updatedUser;
      } catch (error) {
        if (error instanceof GraphQLError) throw error;
        throw new GraphQLError('Failed to update user profile', {
          extensions: { code: 'DATABASE_ERROR' }
        });
      }
    },
  },
};

export default resolvers;
