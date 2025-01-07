import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  Input,
} from "@chakra-ui/react";
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
  firstName?: string;
  lastName?: string;
  profilePic: string; // URL of the profile picture
  email: string;
  password: string; // New password field
  sounds: string[]; // List of saved sounds
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    profilePic: "", // Placeholder for avatar
    firstName: "Joe",
    lastName: "Kerr",
    email: "johndoe@gmail.com",
    password: "password123",
    sounds: ["sound1.mp3", "sound2.mp3", "sound3.mp3"],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState(userProfile.firstName);
  const [tempLastName, setTempLastName] = useState(userProfile.lastName);
  const [tempEmail, setTempEmail] = useState(userProfile.email);
  const [tempPassword, setTempPassword] = useState(userProfile.password);

  // Save Changes
  const handleSave = () => {
    setUserProfile((prev) => ({
      ...prev,
      firstName: tempFirstName,
      lastName: tempLastName,
      email: tempEmail,
      password: tempPassword,
    }));
    setIsEditing(false);
  };

  // Cancel Changes
  const handleCancel = () => {
    setTempFirstName(userProfile.firstName);
    setTempLastName(userProfile.lastName);
    setTempEmail(userProfile.email);
    setTempPassword(userProfile.password);
    setIsEditing(false);
  };

  return (
    <Box>
      <Title title="Wave Lab" />
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
          <Avatar
            name={`${userProfile.firstName} ${userProfile.lastName}`}
            colorPalette={pickPalette(
              `${userProfile.firstName || ""} ${userProfile.lastName || ""}`
            )}
          />

          {/* Editable Fields */}
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