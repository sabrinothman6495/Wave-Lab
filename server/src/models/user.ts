// server/src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for User document
export interface User extends Document {
  username: string;
  password: string;
  profilePic: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  generateToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' },
  profilePic: { type: String, required: false
  }
}, { timestamps: true });

// User Model
const User = mongoose.model<User>('User', userSchema);

export default User;
