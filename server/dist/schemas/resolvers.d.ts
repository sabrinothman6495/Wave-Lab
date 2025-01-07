import { IUser } from '../models/user.js';
interface Context {
    user?: {
        _id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface SoundInput {
    title: string;
    audioData: string;
    instrument: {
        piano: boolean;
        guitar: boolean;
        trumpet: boolean;
    };
    duration?: number;
    waveformData?: number[];
    frequencyData?: number[];
}
declare const resolvers: {
    Query: {
        users: () => Promise<IUser[]>;
        user: (_parent: unknown, { email }: {
            email: string;
        }) => Promise<IUser>;
        getSounds: (_parent: unknown, _args: unknown, context: Context) => Promise<(import("mongoose").Document<unknown, {}, import("../models/Sound.js").ISound> & import("../models/Sound.js").ISound & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[]>;
        getSound: (_parent: unknown, { _id }: {
            _id: string;
        }, context: Context) => Promise<import("mongoose").Document<unknown, {}, import("../models/Sound.js").ISound> & import("../models/Sound.js").ISound & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        me: (_parent: unknown, _args: unknown, context: Context) => Promise<IUser>;
    };
    Mutation: {
        addUser: (_parent: unknown, { input }: {
            input: UserInput;
        }) => Promise<{
            token: string;
            user: import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
                _id: unknown;
            }> & {
                __v: number;
            };
        }>;
        login: (_parent: unknown, { email, password }: {
            email: string;
            password: string;
        }) => Promise<{
            token: string;
            user: import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
                _id: unknown;
            }> & {
                __v: number;
            };
        }>;
        createSound: (_parent: unknown, { title, audioData, instrument, duration, waveformData, frequencyData, }: SoundInput, context: Context) => Promise<import("mongoose").Document<unknown, {}, import("../models/Sound.js").ISound> & import("../models/Sound.js").ISound & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        deleteSound: (_parent: unknown, { _id }: {
            _id: string;
        }, context: Context) => Promise<boolean>;
        updateUserProfile: (_parent: unknown, { firstName, lastName }: {
            firstName?: string;
            lastName?: string;
        }, context: Context) => Promise<IUser>;
    };
};
export default resolvers;
