import User from '../models/User';

const resolvers = {
  Query: {
    users: async () => {
      return await User.find(); // Fetch all users
    },
    user: async (_: any, { id }: { id: string }) => {
      return await User.findById(id); // Fetch user by ID
    },
  },
  Mutation: {
    addUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }) => {
      const newUser = new User({
        name,
        email,
        password, // You should hash passwords before saving in a real app
      });
      await newUser.save();
      return newUser;
    },
  },
};

export default resolvers;
