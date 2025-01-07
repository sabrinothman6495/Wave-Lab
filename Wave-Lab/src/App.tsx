import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/landingPage';
import Login from './pages/Login';
import SignUp from './pages/signUp';
import HomePage from './pages/homePage';
import Profile from './pages/profilePage';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/homePage" /> : <LandingPage />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/homePage" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/homePage" /> : <SignUp />}
      />
      <Route
        path="/homePage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <img src="https://via.placeholder.com/100" alt="Wave Lab Logo" />
        <h1>Wave Lab</h1>
      </div>
      {/* NavBar displayed on all pages */}
      <NavBar
        profilePage="/profile"
        homePage="/home"
        landingPage="/"
      />
      
      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;