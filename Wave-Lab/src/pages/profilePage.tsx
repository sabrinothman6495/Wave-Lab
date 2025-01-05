import React from 'react';
import { Box, Button, Image, Text, Heading, VStack } from '@chakra-ui/react';

interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
  email: string;
  sounds: string; // Lowercase for consistency
}

const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'https://via.placeholder.com/150',
    username: 'JohnDoe',
    email: 'johndoe@gmail.com',
    sounds: 'sound1, sound2, sound3',
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <VStack gap={4}>
        {/* Profile Picture */}
        <Image
          borderRadius="full"
          boxSize="120px"
          src={userProfile.profilePic}
          alt={`${userProfile.username}'s profile`}
        />

        {/* User Info */}
        <Heading size="lg">{userProfile.username}</Heading>
        <Text fontSize="md" color="gray.600">
          Email: {userProfile.email}
        </Text>
        <Text fontSize="md" color="gray.600">
          Sounds: {userProfile.sounds}
        </Text>

        {/* Buttons */}
        <Button colorScheme="blue" size="sm">
          Enter Email
        </Button>
        <Button colorScheme="blue" size="sm" mt="2">
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;