import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from '../client/src/components/Navbar'; 
import './index.html';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff', minHeight: '100vh' }}>
      <Navbar onLogout={handleLogout} theme={theme} onThemeToggle={handleThemeToggle} />
      <main>
        <h1>Welcome to the Soundboard App</h1>
        <p>Here you can explore and interact with various soundboards.</p>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

export default App;