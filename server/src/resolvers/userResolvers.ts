import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const userResolvers = {
    Query: {
      getUser: async (_: any, { id }: { id: string }) => await User.findById(id),
    },
    Mutation: {
      register: async (_: any, { username, password }: { username: string; password: string }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        return await user.save();
      },
      login: async (_: any, { username, password }: { username: string; password: string }) => {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid credentials");
        }
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
      },
    },
  };