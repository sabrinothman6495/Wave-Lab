import React from 'react';
import './Profile.css';
import { Button } from '@chakra-ui/react';



interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture

  email: 'johndoe@gmail.com',
  Sounds: 'sound1, sound2, sound3',
  
}

const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'insertpicpath',
    username: 'JohnDoe',
    email: 'johndoe@gmail.com',
    Sounds: 'sound1, sound2, sound3',

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
        <Button> enter email</Button>
      </div>

<Button mt="4" colorScheme="blue" size="sm">
  Edit Profile
</Button>

    </div>
  );
};

export default Profile;
