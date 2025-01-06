import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

// Create an interface for the methods
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create a type that includes both the document interface and methods
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
