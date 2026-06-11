import express from 'express';
import {
  getMessages,
  createMessage,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messageController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getMessages)
  .post(createMessage); // Public

router.route('/:id')
  .patch(protect, admin, updateMessageStatus)
  .delete(protect, admin, deleteMessage);

export default router;
