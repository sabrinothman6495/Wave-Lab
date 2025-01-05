import React from 'react';
import './Profile.css';
import { Button } from '@chakra-ui/react';

interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
  email: string;
  sounds: string;  // Changed to lowercase for consistency
}


const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'https://via.placeholder.com/150',
    username: 'JohnDoe',
    email: 'johndoe@gmail.com',
    sounds: 'sound1, sound2, sound3', // Fixed lowercase 'sounds'
  };

 

  return (
    <div>
      <div>
        <img
          src={userProfile.profilePic}
          alt={`${userProfile.username}'s profile`}
          className="profile-pic"
        />
        <h1 className="profile-name">{userProfile.username}</h1>
        <p>Email: {userProfile.email}</p>
        <p>Sounds: {userProfile.sounds}</p>
        <Button colorScheme="blue" size="sm">
          Enter Email
        </Button>
      </div>

      <Button colorScheme="blue" size="sm" mt="4">
        Edit Profile
      </Button>
    </div>
  );
};

export default Profile;