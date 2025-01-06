import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./landingPage.css";
import Title from "../components/navbar/title";

const LandingPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the sign-up page
  };

  return (
    <div className="landing-page">
      <Title logo="https://via.placeholder.com/100" title="Wave Lab" />
      {/* Welcome Message */}
      <h1 className="welcome">Welcome to Wave Lab!</h1>
      <p className="description">
        Wave Lab is an innovative website that allows the user to create their
        own music through a keyboard! You will be able to save your muses
        through the use of our profile system! So sign up! It's free! And see
        how you can change the world through music!
      </p>
      {/* Warning Message */}
      <h2 className="warning">
        In order to use our website you must either create an account or log in
        to your current account
      </h2>

      {/* Call to Action Buttons */}
      <div className="cta-buttons">
        <button className="btn login-btn" onClick={handleLoginClick}>
          Log In
        </button>
        <button className="btn signup-btn" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;



