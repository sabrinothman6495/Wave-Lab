import React, { useState } from 'react';
import 'App.css';
import LandingPage from './src/pages/LandingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <LandingPage /> : <div>Log in or create an account</div>}
    </div>
  );
};
