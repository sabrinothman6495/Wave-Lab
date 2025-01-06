import { Schema, model } from 'mongoose';
const audioProjectSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
    // Add metadata fields to schema
    duration: { type: Number },
    waveformData: [{ type: Number }],
    frequencyData: [{ type: Number }],
    // Optional additional metadata fields
    bpm: { type: Number },
    key: { type: String },
    peakAmplitude: { type: Number }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const AudioProjectModel = model('AudioProject', audioProjectSchema);
export default AudioProjectModel;
