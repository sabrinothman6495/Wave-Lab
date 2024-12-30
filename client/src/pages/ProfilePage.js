"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./Profile.css");
const react_2 = require("@chakra-ui/react");
const Profile = () => {
    // Example user data
    const userProfile = {
        profilePic: 'insertpicpath',
        username: 'JohnDoe',
    };
    return (<div className="profile-container">
      <div className="profile-header">
        <img src={userProfile.profilePic} alt={`${userProfile.username}'s profile`} className="profile-pic"/>
        <h1 className="profile-name">{userProfile.username}</h1>
      </div>

    <react_2.Button mt="4" colorScheme="blue" size="sm">
  Edit Profile
    </react_2.Button>

    </div>);
};
exports.default = Profile;
