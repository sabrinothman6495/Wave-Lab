import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
const saltRounds = 10;
// Middleware to authenticate token and attach user to request
export const authenticateToken = ({ req }) => {
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
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
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
// Function to sign a new token when user logs in or registers
export const signToken = (firstName, lastName, email, _id) => {
    // Create a payload with the user information
    const payload = { firstName, lastName, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
    // Sign the token with the payload and secret key, and set it to expire in 2 hours
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
// Function to hash passwords before saving them
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};
// Function to compare the provided password with the stored hashed password
export const comparePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};
// Custom error class for authentication-related issues
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
export default authenticateToken;
