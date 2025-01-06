import User from '../models/user.js';
import Sound from '../models/Sound.js';
import Category from '../models/Category.js';
import { signToken } from '../utils/auth.js';
import { AuthenticationError } from 'apollo-server-express';
const resolvers = {
    Query: {
        users: async () => User.find().populate('sounds'),
        user: async (_parent, { email }) => User.findOne({ email }).populate('sounds'),
        getSounds: async () => Sound.find().populate('category'),
        getSound: async (_parent, { id }) => {
            const sound = await Sound.findById(id).populate('category');
            if (!sound)
                throw new Error(`Sound with ID ${id} not found.`);
            return sound;
        },
        getCategories: async () => Category.find(),
        me: async (_parent, _args, context) => {
            if (context.user) {
                return User.findById(context.user._id).populate('sounds');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await User.create(input);
            const token = signToken(user.email, `${user.firstName} ${user.lastName}`, user._id, user.role);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user)
                throw new AuthenticationError('Invalid credentials');
            const validPassword = await user.isCorrectPassword(password);
            if (!validPassword)
                throw new AuthenticationError('Invalid credentials');
            const token = signToken(user.email, `${user.firstName} ${user.lastName}`, user._id, user.role);
            return { token, user };
        },
        addSound: async (_parent, { name, fileUrl, category }) => {
            const sound = await Sound.create({ name, fileUrl, category });
            return sound.populate('category');
        },
        deleteSound: async (_parent, { id }, context) => {
            if (!context.user)
                throw new AuthenticationError('Unauthorized');
            const sound = await Sound.findByIdAndDelete(id);
            if (!sound)
                throw new Error(`Sound with ID ${id} not found.`);
            return Boolean(sound);
        },
        addCategory: async (_parent, { name }) => {
            return Category.create({ name });
        },
        deleteCategory: async (_parent, { id }) => {
            const category = await Category.findByIdAndDelete(id);
            if (!category)
                throw new Error(`Category with ID ${id} not found.`);
            return Boolean(category);
        },
        createSound: async (_parent, { userId, title, audioUrl }) => {
            const sound = await Sound.create({ userId, title, audioUrl });
            return sound.populate('userId');
        },
    },
};
export default resolvers;
