declare namespace Express {
  interface Request {
    user?: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  }
}
