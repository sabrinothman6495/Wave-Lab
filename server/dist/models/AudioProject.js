"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const audioProjectSchema = new mongoose_1.Schema({
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
const AudioProjectModel = (0, mongoose_1.model)('AudioProject', audioProjectSchema);
exports.default = AudioProjectModel;
