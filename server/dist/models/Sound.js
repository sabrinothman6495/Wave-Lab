import mongoose, { Schema } from 'mongoose';
const SoundSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    audioData: {
        type: String, // Will store Base64 encoded audio data
        required: true
    },
    instrument: {
        piano: {
            type: Boolean,
            default: false
        },
        guitar: {
            type: Boolean,
            default: false
        },
        trumpet: {
            type: Boolean,
            default: false
        }
    },
    duration: {
        type: Number
    },
    waveformData: [{
            type: Number
        }],
    frequencyData: [{
            type: Number
        }]
}, { timestamps: true });
// Add index for faster queries
SoundSchema.index({ userId: 1, createdAt: -1 });
const Sound = mongoose.model('Sound', SoundSchema);
export default Sound;
