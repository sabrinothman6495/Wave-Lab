import React from 'react';
import './App.css'; // Optional: Adjust based on your styles
import ProfilePage from '../src/pages/profilePage'; // Adjust path based on your folder structure

const App: React.FC = () => {
    return (
        <div className="App">
            <ProfilePage />
        </div>
    );
};

export default App;