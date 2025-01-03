import React from 'react';
import './Profile.css';
import { Button } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';



interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
}

 const PlaceHolderPic = () => {
    return (
      <HStack gap="3">
        <Avatar variant="solid" name="Sage Adebayo" />
        <Avatar variant="outline" name="Sage Adebayo" />
        <Avatar variant="subtle" name="Sage Adebayo" />
      </HStack>
    )
  }

const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'https://via.placeholder.com/150',
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
