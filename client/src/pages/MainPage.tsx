/*
import React, { useEffect, useRef, useState } from 'react';

// Interface for props
interface WaveformProps {
  audioUrl: string; // URL of the audio file to display the waveform
}

const Waveform: React.FC<WaveformProps> = ({ audioUrl }) => {
  const canvasRef = useRef(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [sourceNode, setSourceNode] = useState<AudioBufferSourceNode | null>(null);

  // Fetch and decode the audio when the component mounts
  useEffect(() => {
    const fetchAudio = async () => {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);

      // Fetch and decode audio
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);

      // Create analyser node
      const analyser = context.createAnalyser();
      analyser.fftSize = 256; // Adjust for resolution
      analyser.smoothingTimeConstant = 0.85;
      setAnalyserNode(analyser);
    };

    fetchAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioUrl]);

  // Play the audio and start drawing the waveform
  useEffect(() => {
    if (audioBuffer && analyserNode) {
      const context = audioContext!;
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyserNode);
      analyserNode.connect(context.destination);
      setSourceNode(source);

      // Start audio playback
      source.start();

      // Prepare to draw the waveform
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const bufferLength = analyserNode.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          // Function to draw the waveform
          const drawWaveform = () => {
            analyserNode.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
            draw(ctx, dataArray);
            requestAnimationFrame(drawWaveform); // Continuously update the waveform
          };

          drawWaveform();
        }
      }
    }
  }, [audioBuffer, analyserNode, audioContext]);

  // Function to draw the waveform on the canvas
  const draw = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array) => {
    const width = canvasRef.current!.width;
    const height = canvasRef.current!.height;
    const barWidth = width / dataArray.length;

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();

    for (let i = 0; i < dataArray.length; i++) {
      const value = dataArray[i];
      const percent = value / 256;
      const heightBar = height * percent;
      const x = barWidth * i;
      const y = height - heightBar;

      ctx.fillRect(x, y, barWidth, heightBar);
    }

    ctx.fill();
  };

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="200" />
    </div>
  );
};

export default Waveform;
*/