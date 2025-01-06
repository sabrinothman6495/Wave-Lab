import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useAuth } from '../context/AuthContext';
import type { AuthResponse } from '../utils/types';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [loginMutation, { loading }] = useMutation<{ login: AuthResponse }>(LOGIN_USER, {
    onCompleted: (data) => {
      // Use auth context to handle login
      authLogin(data.login.token, data.login.user);
      // Redirect to home page
      navigate('/homePage');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form fields
    if (!email.trim() || !password.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      await loginMutation({
        variables: {
          email,
          password,
        },
      });
    } catch (err) {
      // Error is handled by onError callback
      console.error('Login error:', err);
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
          {error && <div className="error-message">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="toggle-text">
          Don't have an account?{' '}
          <button
            className="signup-btn toggle-link"
            onClick={() => navigate('/signup')}
            disabled={loading}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;