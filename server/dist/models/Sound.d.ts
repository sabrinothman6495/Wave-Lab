import mongoose, { Document } from 'mongoose';
export interface ISound extends Document {
    userId: string;
    title: string;
    audioData: string;
    instrument: {
        piano: boolean;
        guitar: boolean;
        trumpet: boolean;
    };
    duration?: number;
    waveformData?: number[];
    frequencyData?: number[];
    createdAt: Date;
    updatedAt: Date;
}
declare const Sound: mongoose.Model<ISound, {}, {}, {}, mongoose.Document<unknown, {}, ISound> & ISound & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Sound;
