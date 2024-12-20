import React from 'react';

interface UserProfile {
  username: string;
  profilePic: string; // URL of the profile picture
}

const Profile: React.FC = () => {
  // Example user data
  const userProfile: UserProfile = {
    profilePic: 'insertpicpath', // Replace with a valid URL or fetched data
    username:
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
    </div>
  );
};

export default Profile;

