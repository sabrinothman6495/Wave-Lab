import express from 'express';
const router = express.Router();
import {
  createUser,
  login,
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../utils/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authenticateToken, createUser);

router.route('/login').post(login);

router.route('/me').get(authenticateToken, (req, res) => {
  res.json(req.user);
}
);



export default router;
