import { Document } from 'mongoose';

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUser {
  email: string;
  password: string;
  createdAt: Date;
}

export type UserDocument = Document & IUser & IUserMethods;