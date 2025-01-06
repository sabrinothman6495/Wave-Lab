"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};
exports.auth = auth;
