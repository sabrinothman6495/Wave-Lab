import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handles form submission for login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!email.trim() || !password.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    console.log(`Logging in for: ${email}`);
    navigate("/homePage"); // Redirect to the home page
  };

  // Navigate to the Sign Up page
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="title">Welcome to WaveLab</h1>
        <p className="tagline">Explore, create, and share your soundboards.</p>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h2>Log In</h2>
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p className="toggle-text">
          Don't have an account?{" "}
          <button className="signup-btn toggle-link" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
