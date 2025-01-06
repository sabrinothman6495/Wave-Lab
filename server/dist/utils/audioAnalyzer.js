import * as Tone from 'tone';
export async function analyzeAudio(audioUrl) {
    // Create a player and analyzers
    const player = new Tone.Player(audioUrl).toDestination();
    const waveformAnalyzer = new Tone.Analyser('waveform', 1024);
    const frequencyAnalyzer = new Tone.Analyser('fft', 1024);
    // Connect player to analyzers
    player.connect(waveformAnalyzer);
    player.connect(frequencyAnalyzer);
    // Wait for audio to load
    await player.loaded;
    // Get audio metadata
    const metadata = {
        duration: player.buffer.duration,
        waveformData: waveformAnalyzer.getValue(),
        frequencyData: frequencyAnalyzer.getValue()
    };
    // Optional: Detect BPM
    try {
        // You might want to add Tone.js beat detection here
        // This is a placeholder for now
        // metadata.bpm = await detectBPM(player.buffer);
    }
    catch (error) {
        console.error('Error detecting BPM:', error);
    }
    // Clean up
    player.dispose();
    waveformAnalyzer.dispose();
    frequencyAnalyzer.dispose();
    return metadata;
}
// Usage example:
// const metadata = await analyzeAudio('path/to/your/audio.mp3');
// console.log(metadata);
