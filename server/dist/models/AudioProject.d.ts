import { Document } from 'mongoose';
interface AudioProject extends Document {
    userId: string;
    title: string;
    audioUrl: string;
    duration?: number;
    waveformData?: number[];
    frequencyData?: number[];
    bpm?: number;
    key?: string;
    peakAmplitude?: number;
}
declare const AudioProjectModel: import("mongoose").Model<AudioProject, {}, {}, {}, Document<unknown, {}, AudioProject> & AudioProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default AudioProjectModel;
