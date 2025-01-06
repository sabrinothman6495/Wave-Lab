import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import NavBar from "./components/navbar/navbar";
import Profile from "./pages/profilePage";
import Home from "./pages/homePage";
import Login from "./pages/Login";
import "./App.css";
=======
import LandingPage from "./pages/landingPage";
import Login from "./pages/Login";
import SignUp from "./pages/signUp";
import HomePage from "./pages/homePage";
import Profile from "./pages/profilePage";
>>>>>>> 8aa0427c60a59d2499f7d2f4f57259a4fbdef10a

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
=======
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/profile" element={<Profile  />} />
>>>>>>> 8aa0427c60a59d2499f7d2f4f57259a4fbdef10a
      </Routes>
    </Router>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;

>>>>>>> 8aa0427c60a59d2499f7d2f4f57259a4fbdef10a
