import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Text,
  Heading,
  VStack,
  Input,
} from "@chakra-ui/react";
import NavBar from "../components/navbar/navbar";
import Title from "../components/navbar/title";

interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
  email: string;
  password: string; // New password field
  sounds: string[]; // List of saved sounds
}

const Profile: React.FC = () => {
  // Example user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profilePic: "https://via.placeholder.com/150",
    username: "JohnDoe",
    email: "johndoe@gmail.com",
    password: "password123", // Dummy password for example
    sounds: ["sound1.mp3", "sound2.mp3", "sound3.mp3"], // Saved sounds
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Temporary state for editing fields
  const [tempUsername, setTempUsername] = useState(userProfile.username);
  const [tempEmail, setTempEmail] = useState(userProfile.email);
  const [tempPassword, setTempPassword] = useState(userProfile.password);
  const [tempProfilePic, setTempProfilePic] = useState(userProfile.profilePic);

  // Handle Profile Picture Upload
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfilePic(reader.result as string); // Temporarily set the profile pic
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Changes
  const handleSave = () => {
    setUserProfile((prev) => ({
      ...prev,
      username: tempUsername,
      email: tempEmail,
      password: tempPassword,
      profilePic: tempProfilePic,
    }));
    setIsEditing(false);
  };

  // Cancel Changes
  const handleCancel = () => {
    setTempUsername(userProfile.username);
    setTempEmail(userProfile.email);
    setTempPassword(userProfile.password);
    setTempProfilePic(userProfile.profilePic);
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
          {/* Profile Picture */}
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

          {/* User Info */}
          {isEditing ? (
            <>
              <Input
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Enter username"
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
              <Heading size="lg">{userProfile.username}</Heading>
              <Text fontSize="md" color="gray.600">
                Email: {userProfile.email}
              </Text>
              <Text fontSize="md" color="gray.600">Sounds:</Text>
              <VStack align="start">
                {userProfile.sounds.map((sound, index) => (
                  <Text key={index} fontSize="md" color="gray.600">
                    {sound}
                  </Text>
                ))}
              </VStack>
            </>
          )}

          {/* Buttons */}
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
