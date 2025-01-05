import mongoose from 'mongoose';
const sliderSchema = new mongoose.Schema({
    base: { type: String, required: true },
    treble: { type: String, required: true },
    mid: { type: String, required: true },
});
const Slider = mongoose.model('Slider', sliderSchema);
export default Slider;
