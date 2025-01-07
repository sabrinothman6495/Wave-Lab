import React, { useState, useEffect } from "react";
import { Box, Button, Image, Text, Heading, VStack, Input } from "@chakra-ui/react";
import NavBar from "../components/navbar/navbar";
import Title from "../components/navbar/title";
import { Avatar } from "../components/ui/avatar"


// Color palette for avatars
const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];
const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

interface UserProfile {
  username: string;
  profilePic: string;
  email: string;
  password: string;
  sounds: string[];
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profilePic: "https://via.placeholder.com/150",
    username: "",
    email: "",
    password: "",
    sounds: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userProfile.username);
  const [tempEmail, setTempEmail] = useState(userProfile.email);
  const [tempPassword, setTempPassword] = useState(userProfile.password);
  const [tempProfilePic, setTempProfilePic] = useState(userProfile.profilePic);

  // Function to fetch user data from backend
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error fetching user profile');
      }
  
      const data = await response.json();
      console.log(data); // Your profile data here
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      username: tempUsername,
      email: tempEmail,
      password: tempPassword,
      profilePic: tempProfilePic,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempFirstName(userProfile.firstName);
    setTempLastName(userProfile.lastName);
    setTempEmail(userProfile.email);
    setTempPassword(userProfile.password);
    setIsEditing(false);
  };

  return (
    <Box>
      <Title logo="https://via.placeholder.com/100" title="Wave Lab" />
      <NavBar profilePage="/profile" homePage="/homePage" landingPage="/" />
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
          <Image
            borderRadius="full"
            boxSize="120px"
            src={tempProfilePic}
            alt={`${userProfile.username}'s profile`}
          />
          {isEditing && (
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
            />
          )}

          {isEditing ? (
            <>
              <Input
                value={tempFirstName}
                onChange={(e) => setTempFirstName(e.target.value)}
                placeholder="Enter First Name"
              />
              <Input
                value={tempLastName}
                onChange={(e) => setTempLastName(e.target.value)}
                placeholder="Enter Last Name"
              />
              <Input
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="Enter email"
              />
              <Input
                type="password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </>
          ) : (
            <>
              <Heading size="lg">
                {userProfile.firstName} {userProfile.lastName}
              </Heading>
              <Text fontSize="md" color="gray.600">
                Email: {userProfile.email}
              </Text>
              <Text fontSize="md" color="gray.600">
                Sounds:
              </Text>
              <VStack align="start">
                {userProfile.sounds.map((sound, index) => (
                  <Text key={index} fontSize="md" color="gray.600">
                    {sound}
                  </Text>
                ))}
              </VStack>
            </>
          )}

          {isEditing ? (
            <VStack gap={2}>
              <Button colorScheme="blue" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="gray" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </VStack>
          ) : (
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;

