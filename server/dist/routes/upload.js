"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const AudioProject_1 = __importDefault(require("../models/AudioProject"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/upload', upload.single('audioFile'), async (req, res) => {
    try {
        const result = {
            filename: req.file?.filename,
            path: req.file?.path,
        };
        const audioProject = new AudioProject_1.default({
            userId: req.body.userId,
            title: req.body.title,
            audioUrl: result.path, // Assuming you want to store the file path
        });
        await audioProject.save();
        res.status(200).json(audioProject);
    }
    catch (error) {
        res.status(500).send('Error uploading audio file');
    }
});
exports.default = router;
