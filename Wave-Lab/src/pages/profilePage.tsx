import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  Box, 
  Button, 
  Image, 
  Text, 
  Heading, 
  VStack
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { GET_USER_PROFILE, UPDATE_PROFILE } from '../graphql/queries';


const Profile: React.FC = () => {
  const toast = useToast();
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  // Show loading state
  if (loading) return (
    <Box textAlign="center" mt="8">
      Loading profile...
    </Box>
  );

  // Show error state
  if (error) return (
    <Box textAlign="center" mt="8" color="red.500">
      Error loading profile: {error.message}
    </Box>
  );

  const userProfile = data?.me;

  const handleEditProfile = async () => {
    try {
      await updateProfile({
        variables: {
          username: userProfile.username,
          email: userProfile.email,
        },
      });
      toast({
        title: "Profile updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error updating profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          src="https://via.placeholder.com/150"
          alt={`${userProfile.username}'s profile`}
        />

        {/* User Info */}
        <Heading size="lg">{userProfile.username}</Heading>
        <Text fontSize="md" color="gray.600">
          Email: {userProfile.email}
        </Text>
        <Text fontSize="md" color="gray.600">
          Sounds: {userProfile.Sound?.length || 0} uploaded
        </Text>

        {/* Display Sound titles if any */}
        {userProfile.Sound?.length > 0 && (
            <VStack align="start" w="100%">
            <Text fontWeight="bold">Your Sounds:</Text>
            {userProfile.Sound.map((sound: { _id: string; title: string }) => (
              <Text key={sound._id}>{sound.title}</Text>
            ))}
            </VStack>
        )}

        {/* Buttons */}
        <Button colorScheme="red" size="md">
          Enter Email
        </Button>
        <Button 
          colorScheme="blue" 
          size="sm" 
          mt="2"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;