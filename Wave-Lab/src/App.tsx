import React from 'react';
import './App.css'; 
//import ProfilePage from '../src/pages/profilePage'; // Adjust path based on your folder structure
import HomePage from './pages/homePage';

const App: React.FC = () => {
    return (
        <div className="App">
            <HomePage />
        </div>
    );
};

export default App;