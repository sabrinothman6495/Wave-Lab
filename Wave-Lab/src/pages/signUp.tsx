import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      // Store the token in localStorage
      localStorage.setItem('auth_token', data.addUser.token);
      // Store user data if needed
      localStorage.setItem('user', JSON.stringify(data.addUser.user));
      // Show success message and redirect
      alert('Account created successfully!');
      navigate('/homePage');
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setError('');

    // Validate form fields
    if (!email.trim() || !password.trim() || !confirmPassword.trim() || 
        !firstName.trim() || !lastName.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await addUser({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      });
    } catch (err) {
      // Error is handled by onError callback
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-container">
      <div className="hero-section">
        <h1 className="title">Create Your Account</h1>
        <p className="tagline">Join Wave Lab and start creating your music!</p>
      </div>
      <div className="form-section">
        {error && <div className="error-message">{error}</div>}
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          Already have an account?{' '}
          <button
            className="login-btn toggle-link"
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Log In
          </button>
        </p>
        <p className="toggle-text">
          Already have an account?{' '}
          <button
            className="login-btn toggle-link"
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;