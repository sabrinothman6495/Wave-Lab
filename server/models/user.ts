// server/src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

// TypeScript interface for User document
export interface IUser extends Document {
  username: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false
  }
}, { timestamps: true });

// User Model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
