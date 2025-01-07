export declare const authenticateToken: ({ req }: any) => any;
export declare const signToken: (firstName: string, lastName: string, email: string, _id: unknown) => string;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (inputPassword: string, storedPassword: string) => Promise<boolean>;
export declare class AuthenticationError extends Error {
    constructor(message: string);
}
export default authenticateToken;
