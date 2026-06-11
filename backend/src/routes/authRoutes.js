import express from 'express';
import { authUser, logoutUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getUserProfile);
export default router;
//# sourceMappingURL=authRoutes.js.map