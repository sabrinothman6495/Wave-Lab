import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import "./playbackEditor.css";

interface PlaybackEditorProps {
  audioBuffer: ArrayBuffer | null;
  savedRecordings: { name: string; audioUrl: string }[];
  waveSurferRef: React.MutableRefObject<WaveSurfer | null>;
}

const PlaybackEditor: React.FC<PlaybackEditorProps> = ({
  audioBuffer,
  savedRecordings,
  waveSurferRef,
}) => {
  useEffect(() => {
    // Initialize WaveSurfer if not already initialized
    if (!waveSurferRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#ddd",
        progressColor: "#007bff",
        cursorColor: "#333",
        height: 100,
      });
    }

    return () => {
      console.log(waveSurferRef.current);
      waveSurferRef.current?.destroy();
      waveSurferRef.current = null;
    };
  }, [waveSurferRef]);

  useEffect(() => {
    if (audioBuffer) {
      const audioUrl = URL.createObjectURL(new Blob([audioBuffer]));
      waveSurferRef.current?.load(audioUrl);
    }
  }, [audioBuffer, waveSurferRef]);

  return (
    <div className="playback-editor">
      <div id="waveform"></div>
      <div className="saved-recordings">
        <h3>Saved Recordings</h3>
        <ul>
          {savedRecordings.map((recording, index) => (
            <li key={index}>
              <p>{recording.name}</p>
              <audio controls src={recording.audioUrl}></audio>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaybackEditor;

