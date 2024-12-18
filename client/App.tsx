import React from 'react';
import Waveform from './src/pages/MainPage';

const App: React.FC = () => {
  return (
    <div>
      <h1>Audio Waveform</h1>
      <Waveform audioUrl="https://www.example.com/path-to-your-audio-file.mp3" />
    </div>
  );
};

export default App;