import express from "express";
import multer from "multer";
import { uploadAudio, getAudioList } from "../controllers/AudioController";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("audio"), uploadAudio); // Calls uploadAudio controller
router.get("/list", getAudioList); // Calls getAudioList controller

export default router;
