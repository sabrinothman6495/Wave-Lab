import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
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
    alert("Account created successfully!");

    navigate("/login"); // Redirect to login after successful sign-up
  };

  return (
    <div className="signup-container">
      <div className="hero-section">
        <h1 className="title">Create Your Account</h1>
        <p className="tagline">Join Wave Lab and start creating your music!</p>
      </div>
      <div className="form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
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
        <p className="toggle-text">
          Already have an account?{" "}
          <button
            className="login-btn toggle-link"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
