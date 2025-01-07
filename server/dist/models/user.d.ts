import { Document } from 'mongoose';
import { ISound } from './Sound';
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
declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
