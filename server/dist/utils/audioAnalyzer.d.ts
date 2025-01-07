interface AudioMetadata {
    duration: number;
    waveformData: Float32Array | Float32Array[];
    frequencyData?: Float32Array | Float32Array[];
    bpm?: number;
}
export declare function analyzeAudio(audioUrl: string): Promise<AudioMetadata>;
export {};
