"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("../models/user.js"));
const Sound_js_1 = __importDefault(require("../models/Sound.js"));
const Category_js_1 = __importDefault(require("../models/Category.js"));
const auth_js_1 = require("../utils/auth.js");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers = {
    Query: {
        users: async () => user_js_1.default.find().populate('sounds'),
        user: async (_parent, { username }) => user_js_1.default.findOne({ username }).populate('sounds'),
        getSounds: async () => Sound_js_1.default.find().populate('category'),
        getSound: async (_parent, { id }) => {
            const sound = await Sound_js_1.default.findById(id).populate('category');
            if (!sound)
                throw new Error(`Sound with ID ${id} not found.`);
            return sound;
        },
        getCategories: async () => Category_js_1.default.find(),
        me: async (_parent, _args, context) => {
            if (context.user) {
                return user_js_1.default.findById(context.user._id).populate('sounds');
            }
            throw new apollo_server_express_1.AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await user_js_1.default.create(input);
            const token = (0, auth_js_1.signToken)(user.email, user.username, user._id);
            return { token, user };
        },
        login: async (_parent, { email, password }) => {
            const user = await user_js_1.default.findOne({ email });
            if (!user)
                throw new apollo_server_express_1.AuthenticationError('Invalid credentials');
            const validPassword = await user.isCorrectPassword(password);
            if (!validPassword)
                throw new apollo_server_express_1.AuthenticationError('Invalid credentials');
            const token = (0, auth_js_1.signToken)(user.email, user.username, user._id);
            return { token, user };
        },
        addSound: async (_parent, { name, fileUrl, category }) => {
            const sound = await Sound_js_1.default.create({ name, fileUrl, category });
            return sound.populate('category');
        },
        deleteSound: async (_parent, { id }, context) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError('Unauthorized');
            const sound = await Sound_js_1.default.findByIdAndDelete(id);
            if (!sound)
                throw new Error(`Sound with ID ${id} not found.`);
            return Boolean(sound);
        },
        addCategory: async (_parent, { name }) => {
            return Category_js_1.default.create({ name });
        },
        deleteCategory: async (_parent, { id }) => {
            const category = await Category_js_1.default.findByIdAndDelete(id);
            if (!category)
                throw new Error(`Category with ID ${id} not found.`);
            return Boolean(category);
        },
        createSound: async (_parent, { userId, title, audioUrl }) => {
            const sound = await Sound_js_1.default.create({ userId, title, audioUrl });
            return sound.populate('userId');
        },
    },
};
exports.default = resolvers;
