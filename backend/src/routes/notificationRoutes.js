import express from 'express';
import { getNotifications, updateNotification, deleteNotification } from '../controllers/notificationController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.route('/').get(protect, admin, getNotifications);
router.route('/:id')
    .patch(protect, admin, updateNotification)
    .delete(protect, admin, deleteNotification);
export default router;
//# sourceMappingURL=notificationRoutes.js.map