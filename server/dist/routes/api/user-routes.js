import express from 'express';
const router = express.Router();
import { getUserProfile, createUser, login } from '../../controllers/user-controller.js';
import { authenticateToken } from '../../utils/auth.js';
router.route('/').post(createUser).put(authenticateToken, createUser);
router.route('/login').post(login);
router.route('/me').get(authenticateToken, getUserProfile);
export default router;
