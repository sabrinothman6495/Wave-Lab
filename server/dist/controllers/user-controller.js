"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.getUserProfile = void 0;
// Import the user model and signToken function
const user_js_1 = __importDefault(require("../models/user.js"));
const auth_js_1 = require("../utils/auth.js");
const getUserProfile = (req, res) => {
    const user = req.user; // TypeScript now recognizes the 'user' property
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ profile: user });
};
exports.getUserProfile = getUserProfile;
// Create user
const createUser = async (req, res) => {
    const user = await user_js_1.default.create(req.body);
    if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
    return res.json({ token, user });
};
exports.createUser = createUser;
// Login user
const login = async (req, res) => {
    const user = await user_js_1.default.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
    return res.json({ token, user });
};
exports.login = login;
