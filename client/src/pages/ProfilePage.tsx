import React from 'react';
import './Profile.css';
import { Button } from '@chakra-ui/react';



interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
}

const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'insertpicpath',
    username: 'JohnDoe',
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userProfile.profilePic}
          alt={`${userProfile.username}'s profile`}
          className="profile-pic"
        />
        <h1 className="profile-name">{userProfile.username}</h1>
      </div>

<Button mt="4" colorScheme="blue" size="sm">
  Edit Profile
</Button>

    </div>
  );
};

export default Profile;
