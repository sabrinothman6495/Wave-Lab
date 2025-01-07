import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = ({ req }) => {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // If the token is sent in the authorization header, extract the token from the header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]; // Get the token part after "Bearer "
    }
    // If no token is provided, return an empty object (no user context)
    if (!token) {
        return {};
    }
    // Try to verify the token
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
        // If the token is valid, return the user data in the context
        return { user: token, ...data };
    }
    catch (err) {
        console.error('Invalid token', err);
        // Return an empty object if the token is invalid
        return {};
    }
};
// Function to sign a new token when user logs in or registers
export const signToken = (firstName, lastName, email, _id) => {
    // Create a payload with the user information
    const payload = { firstName, lastName, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY || ''; // Get the secret key from environment variables
    // Sign the token with the payload and secret key, and set it to expire in 2 hours
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
// Function to hash passwords before saving them
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
// Function to compare the provided password with the stored hashed password
export const comparePassword = async (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
};
// Custom error class for authentication-related issues
export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
export default authenticateToken;
