import User from './user.js';

const createUser = async () => {
  try {
    const user = new User({
      username: 'exampleUser',
      email: 'user@example.com',
      password: 'securepassword123',
    });

    const savedUser = await user.save();
    console.log('User created:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

createUser();
