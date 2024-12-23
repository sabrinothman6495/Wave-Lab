import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// TypeScript interface for User document
export interface IUser extends Document {
  username: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false },
  },
  { timestamps: true }
);

// Hash the password before saving the user
const saltRounds = 10;
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
  } catch (error) {
    // Cast error to CallbackError to match the expected type
    next(error as CallbackError);
  }
});

// User Model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
