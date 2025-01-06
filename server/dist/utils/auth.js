"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.signToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware to authenticate token and attach user to request
const authenticateToken = ({ req }) => {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // If the token is sent in the authorization header, extract the token from the header
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    // If no token is provided, return the request object as is
    if (!token) {
        return req;
    }
    // Try to verify the token
    try {
        const { data } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
        // If the token is valid, attach the user data to the request object
        req.user = data;
    }
    catch (err) {
        // If the token is invalid, log an error message
        console.log('Invalid token');
    }
    // Return the request object
    return req;
};
exports.authenticateToken = authenticateToken;
// Function to sign a new token when user logs in or registers
const signToken = (firstName, lastName, email, _id) => {
    // Create a payload with the user information
    const payload = { firstName, lastName, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
    // Sign the token with the payload and secret key, and set it to expire in 2 hours
    return jsonwebtoken_1.default.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
exports.signToken = signToken;
// Custom error class for authentication-related issues
class AuthenticationError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
exports.AuthenticationError = AuthenticationError;
exports.default = exports.authenticateToken;
