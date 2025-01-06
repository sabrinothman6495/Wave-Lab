"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sliderSchema = new mongoose_1.default.Schema({
    base: { type: String, required: true },
    treble: { type: String, required: true },
    mid: { type: String, required: true },
});
const Slider = mongoose_1.default.model('Slider', sliderSchema);
exports.default = Slider;
