"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("./user.js"));
const createUser = async () => {
    try {
        const user = new user_js_1.default({
            firstName: 'John',
            lastName: 'Doe',
            email: 'user@example.com',
            password: 'securepassword123',
        });
        const savedUser = await user.save();
        console.log('User created:', savedUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
};
createUser();
