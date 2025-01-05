import React, { useState } from 'react';
import 'App.css';
import LandingPage from './src/pages/LandingPage';
import ProfilePage from './src/pages/ProfilePage';
import HomePage from './src/pages/HomePage';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
        <div className="App">
        {isLoggedIn ? <ProfilePage /> : <LandingPage />}
        </div>
    );
    };

export default App;
