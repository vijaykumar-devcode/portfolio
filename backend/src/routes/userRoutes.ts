import express from 'express';
import { getPublicProfile, updateProfile, downloadCV } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', getPublicProfile);
router.get('/cv', downloadCV);
router.put('/profile', protect, admin, updateProfile);

export default router;
