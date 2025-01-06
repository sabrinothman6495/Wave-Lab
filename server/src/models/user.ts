import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { ISound } from './Sound';

// Define an interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sounds: ISound[];
  user?: {
    _id: string;
  };
  isCorrectPassword: (password: string) => Promise<boolean>;
  role?: string;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,

  },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    sounds: [{ type: Schema.Types.ObjectId, ref: 'Sound' }]
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
