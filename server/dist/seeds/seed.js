"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_js_1 = __importDefault(require("../config/connection.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
const Sound_js_1 = __importDefault(require("../models/Sound.js"));
const cleanDB_js_1 = __importDefault(require("./cleanDB.js"));
const soundData_json_1 = __importDefault(require("./soundData.json"));
const userData_json_1 = __importDefault(require("./userData.json"));
const Tone = __importStar(require("tone"));
// Add audio analysis function
async function analyzeAudio(audioUrl) {
    const player = new Tone.Player(audioUrl).toDestination();
    const waveformAnalyzer = new Tone.Analyser('waveform', 1024);
    const frequencyAnalyzer = new Tone.Analyser('fft', 1024);
    player.connect(waveformAnalyzer);
    player.connect(frequencyAnalyzer);
    await player.loaded;
    const metadata = {
        duration: player.buffer.duration,
        waveformData: Array.from(waveformAnalyzer.getValue()),
        frequencyData: Array.from(frequencyAnalyzer.getValue())
    };
    // Cleanup
    player.dispose();
    waveformAnalyzer.dispose();
    frequencyAnalyzer.dispose();
    return metadata;
}
// Modified seeding function
const seedDatabase = async () => {
    try {
        await (0, connection_js_1.default)();
        await (0, cleanDB_js_1.default)();
        // First create users
        await user_js_1.default.create(userData_json_1.default);
        // Process and create sounds with metadata
        const enrichedSoundData = await Promise.all(soundData_json_1.default.map(async (sound) => {
            try {
                const metadata = await analyzeAudio(sound.audioUrl);
                return {
                    ...sound,
                    duration: metadata.duration,
                    waveformData: metadata.waveformData,
                    frequencyData: metadata.frequencyData
                };
            }
            catch (error) {
                console.error(`Error analyzing sound ${sound.title}:`, error);
                return sound; // Fall back to original data if analysis fails
            }
        }));
        await Sound_js_1.default.insertMany(enrichedSoundData);
        console.log('Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();
