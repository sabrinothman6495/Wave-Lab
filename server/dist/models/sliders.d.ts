import mongoose from 'mongoose';
export interface ISlider extends Document {
    base: string;
    treble: string;
    mid: string;
}
declare const Slider: mongoose.Model<{
    base: string;
    treble: string;
    mid: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    base: string;
    treble: string;
    mid: string;
}> & {
    base: string;
    treble: string;
    mid: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    base: string;
    treble: string;
    mid: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    base: string;
    treble: string;
    mid: string;
}>> & mongoose.FlatRecord<{
    base: string;
    treble: string;
    mid: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Slider;
