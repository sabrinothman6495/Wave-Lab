import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  // Handle form submission for login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state before new attempt
    setError(null);

    // Validate form fields
    if (!email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    console.log(`Logging in for: ${email}`);

    setLoading(true); // Start loading

    try {
      // Make a POST request to the backend for login
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token (you can store it in localStorage or cookies)
        localStorage.setItem("token", data.token);
        // Redirect to the home page after successful login
        navigate("/homePage");
      } else {
        setError(data.message || "Login failed. Please try again."); // Show error message
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
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

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="toggle-text">
          Don't have an account?{" "}
          <button
            className="signup-btn toggle-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
