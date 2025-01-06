import db from '../config/connection.js';
import User from '../models/user.js';
import Sound from '../models/Sound.js';
import cleanDB from './cleanDB.js';
import soundData from './soundData.json' assert { type: 'json'};
import userData from './userData.json' assert { type: 'json'};
import * as Tone from 'tone';

// Add audio analysis function
async function analyzeAudio(audioUrl: string) {
  const player = new Tone.Player(audioUrl).toDestination();
  const waveformAnalyzer = new Tone.Analyser('waveform', 1024);
  const frequencyAnalyzer = new Tone.Analyser('fft', 1024);
  
  player.connect(waveformAnalyzer);
  player.connect(frequencyAnalyzer);

  await player.loaded;

  const metadata = {
    duration: player.buffer.duration,
    waveformData: Array.from(waveformAnalyzer.getValue() as Float32Array),
    frequencyData: Array.from(frequencyAnalyzer.getValue() as Float32Array)
  };

  // Cleanup
  player.dispose();
  waveformAnalyzer.dispose();
  frequencyAnalyzer.dispose();

  return metadata;
}

// Modified seeding function
const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // First create users
    await User.create(userData);

    // Process and create sounds with metadata
    const enrichedSoundData = await Promise.all(
      soundData.map(async (sound) => {
        try {
          const metadata = await analyzeAudio(sound.url);
          return {
            ...sound,
            duration: metadata.duration,
            waveformData: metadata.waveformData,
            frequencyData: metadata.frequencyData
          };
        } catch (error) {
          console.error(`Error analyzing sound ${sound.name}:`, error);
          return sound; // Fall back to original data if analysis fails
        }
      })
    );

    await Sound.insertMany(enrichedSoundData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();