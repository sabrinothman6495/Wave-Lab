import mongoose, { Schema } from 'mongoose';
const SoundSchema = new Schema({
    piano: { type: String, required: true },
    guitar: { type: String, required: true },
    trumpet: { type: String },
}, { timestamps: true });
const Sound = mongoose.model('Sound', SoundSchema);
export default Sound;
