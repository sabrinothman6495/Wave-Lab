import React from "react";
import Title from "../components/navbar/title";

const landingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Title with Logo */}
      <Title
        logo="https://via.placeholder.com/100" // Replace with your logo URL
        title="Wave Lab"
      />

      {/* Call to Action */}
      <div className="cta-buttons">
        <button className="btn login-btn">Log In</button>
        <button className="btn signup-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default landingPage;
