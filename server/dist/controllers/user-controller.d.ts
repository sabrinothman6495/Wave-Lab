import type { Request, Response } from 'express';
interface CreateUserBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
interface LoginBody {
    email: string;
    password: string;
}
export declare const getUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createUser: (req: Request<{}, {}, CreateUserBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
