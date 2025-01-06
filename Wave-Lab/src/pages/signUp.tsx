import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handles form submission for signup
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(`Creating account for: ${email}`);

    // Redirect to the home page after successful signup
    alert("Account created successfully!");
    navigate("/homePage");
  };

  return (
    <div className="signup-container">
      <div className="hero-section">
        <h1 className="title">Create Your Account</h1>
        <p className="tagline">Join Wave Lab and start creating your music!</p>
      </div>
      <div className="form-section">
        <form className="auth-form" onSubmit={handleSignUpSubmit}>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
