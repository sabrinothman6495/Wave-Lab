import { Schema, model } from 'mongoose';
const audioProjectSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    audioUrl: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const AudioProjectModel = model('AudioProject', audioProjectSchema);
export default AudioProjectModel;
