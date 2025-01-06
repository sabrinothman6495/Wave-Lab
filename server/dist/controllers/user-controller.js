"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.getUserProfile = void 0;
const user_js_1 = __importDefault(require("../models/user.js"));
const auth_js_1 = require("../utils/auth.js");
const getUserProfile = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ profile: user });
};
exports.getUserProfile = getUserProfile;
// Create user
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check if user already exists with the same email
        const existingUser = await user_js_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use!' });
        }
        // Create a new user
        const user = await user_js_1.default.create({ firstName, lastName, email, password });
        if (!user) {
            return res.status(400).json({ message: 'Something went wrong!' });
        }
        // Create token and send response
        const token = (0, auth_js_1.signToken)(user.email, `${user.firstName} ${user.lastName}`, user._id, user.role);
        return res.json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
exports.createUser = createUser;
// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await user_js_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        // Create token and send response
        const token = (0, auth_js_1.signToken)(user.email, `${user.firstName} ${user.lastName}`, user._id, user.role);
        return res.json({ token, user });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
exports.login = login;
